-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- IMAGES TABLE
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., "SCI-FI-1957-042"
  title VARCHAR(255) NOT NULL,
  year INTEGER, -- 1950-1969
  description TEXT,
  artist VARCHAR(255),
  source_url TEXT NOT NULL, -- Wikimedia Commons link
  license_info TEXT NOT NULL, -- e.g., "Public Domain"
  file_path TEXT NOT NULL, -- CDN URL or local path
  thumbnail_path TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  theme_tags TEXT[], -- ['space-exploration', 'robots', 'flying-saucers']
  color_palette JSONB, -- [{hex: '#FF5733', percentage: 45}, ...]
  star_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- FOLDERS TABLE (User Collections)
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) NOT NULL, -- URL-friendly version
  is_public BOOLEAN DEFAULT true,
  image_count INTEGER DEFAULT 0,
  star_count INTEGER DEFAULT 0, -- Stars on the folder itself
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

-- FOLDER_IMAGES (Many-to-Many)
CREATE TABLE folder_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  position INTEGER, -- For custom ordering within folder
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(folder_id, image_id)
);

-- STARS (User favorites)
CREATE TABLE stars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, image_id)
);

-- FOLDER_STARS (Stars on entire folders)
CREATE TABLE folder_stars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, folder_id)
);

-- COMMENTS
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For replies
  text TEXT NOT NULL,
  is_deleted BOOLEAN DEFAULT false,
  is_flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- FOLLOWS (User following system)
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- ACTIVITY_LOG (Optional - for trending calculations)
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  activity_type VARCHAR(50) NOT NULL, -- 'star', 'comment', 'folder_create', 'share'
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES for Performance
CREATE INDEX idx_images_year ON images(year);
CREATE INDEX idx_images_theme_tags ON images USING GIN(theme_tags);
CREATE INDEX idx_images_star_count ON images(star_count DESC);
CREATE INDEX idx_folders_user_id ON folders(user_id);
CREATE INDEX idx_folder_images_folder_id ON folder_images(folder_id);
CREATE INDEX idx_stars_user_id ON stars(user_id);
CREATE INDEX idx_stars_image_id ON stars(image_id);
CREATE INDEX idx_comments_image_id ON comments(image_id);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE folder_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE stars ENABLE ROW LEVEL SECURITY;
ALTER TABLE folder_stars ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- USERS: Anyone can view public profiles, users can update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- IMAGES: Public read, admin write
CREATE POLICY "Images are viewable by everyone"
  ON images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert images"
  ON images FOR INSERT
  WITH CHECK ((SELECT is_admin FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can update images"
  ON images FOR UPDATE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can delete images"
  ON images FOR DELETE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

-- FOLDERS: Public can view public folders, users can manage their own
CREATE POLICY "Public folders are viewable by everyone"
  ON folders FOR SELECT
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can create their own folders"
  ON folders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders"
  ON folders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders"
  ON folders FOR DELETE
  USING (auth.uid() = user_id);

-- FOLDER_IMAGES: Follows folder permissions
CREATE POLICY "Folder images viewable if folder is viewable"
  ON folder_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM folders
      WHERE folders.id = folder_images.folder_id
      AND (folders.is_public = true OR folders.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can add images to their own folders"
  ON folder_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM folders
      WHERE folders.id = folder_images.folder_id
      AND folders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove images from their own folders"
  ON folder_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM folders
      WHERE folders.id = folder_images.folder_id
      AND folders.user_id = auth.uid()
    )
  );

-- STARS: Users can view and manage their own stars
CREATE POLICY "Users can view all stars"
  ON stars FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own stars"
  ON stars FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stars"
  ON stars FOR DELETE
  USING (auth.uid() = user_id);

-- FOLDER_STARS: Similar to stars
CREATE POLICY "Users can view all folder stars"
  ON folder_stars FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own folder stars"
  ON folder_stars FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folder stars"
  ON folder_stars FOR DELETE
  USING (auth.uid() = user_id);

-- COMMENTS: Public read, users can manage their own, admins can delete any
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any comment"
  ON comments FOR DELETE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

-- FOLLOWS: Users can view and manage their own follows
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own follows"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follows"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);

-- ACTIVITY_LOG: Public read, authenticated write
CREATE POLICY "Activity log is viewable by everyone"
  ON activity_log FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create activity logs"
  ON activity_log FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- FUNCTIONS AND TRIGGERS

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update folder image count
CREATE OR REPLACE FUNCTION update_folder_image_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE folders SET image_count = image_count + 1 WHERE id = NEW.folder_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE folders SET image_count = image_count - 1 WHERE id = OLD.folder_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER folder_images_count_trigger
  AFTER INSERT OR DELETE ON folder_images
  FOR EACH ROW EXECUTE FUNCTION update_folder_image_count();

-- Function to update image star count
CREATE OR REPLACE FUNCTION update_image_star_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE images SET star_count = star_count + 1 WHERE id = NEW.image_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE images SET star_count = star_count - 1 WHERE id = OLD.image_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER image_star_count_trigger
  AFTER INSERT OR DELETE ON stars
  FOR EACH ROW EXECUTE FUNCTION update_image_star_count();

-- Function to update folder star count
CREATE OR REPLACE FUNCTION update_folder_star_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE folders SET star_count = star_count + 1 WHERE id = NEW.folder_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE folders SET star_count = star_count - 1 WHERE id = OLD.folder_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER folder_star_count_trigger
  AFTER INSERT OR DELETE ON folder_stars
  FOR EACH ROW EXECUTE FUNCTION update_folder_star_count();

-- Function to update image comment count
CREATE OR REPLACE FUNCTION update_image_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE images SET comment_count = comment_count + 1 WHERE id = NEW.image_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE images SET comment_count = comment_count - 1 WHERE id = OLD.image_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER image_comment_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_image_comment_count();

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'stars' THEN
    INSERT INTO activity_log (user_id, activity_type, image_id)
    VALUES (NEW.user_id, 'star', NEW.image_id);
  ELSIF TG_TABLE_NAME = 'comments' THEN
    INSERT INTO activity_log (user_id, activity_type, image_id)
    VALUES (NEW.user_id, 'comment', NEW.image_id);
  ELSIF TG_TABLE_NAME = 'folders' THEN
    INSERT INTO activity_log (user_id, activity_type, folder_id)
    VALUES (NEW.user_id, 'folder_create', NEW.id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_star_activity
  AFTER INSERT ON stars
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_comment_activity
  AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_folder_activity
  AFTER INSERT ON folders
  FOR EACH ROW EXECUTE FUNCTION log_activity();
