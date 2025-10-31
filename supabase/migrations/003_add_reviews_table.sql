-- REVIEWS TABLE
CREATE TABLE reviews (
  id VARCHAR(50) PRIMARY KEY, -- Using string IDs to match existing review pages
  title VARCHAR(255) NOT NULL,
  decade VARCHAR(20) NOT NULL, -- e.g., '1950s'
  excerpt TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'Books', 'Audio', 'Film'
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0, -- For controlling order on homepage
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- INDEX for featured reviews
CREATE INDEX idx_reviews_featured ON reviews(is_featured, sort_order);

-- ENABLE RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS POLICY: Public read access
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- RLS POLICY: Admin write access
CREATE POLICY "Admins can insert reviews"
  ON reviews FOR INSERT
  WITH CHECK ((SELECT is_admin FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

-- INSERT featured reviews data
INSERT INTO reviews (id, title, decade, excerpt, category, rating, is_featured, sort_order) VALUES
('1', 'Foundation by Isaac Asimov', '1950s', 'A sweeping tale of galactic empire and psychohistory that defined the golden age of science fiction...', 'Books', 5, true, 1),
('3', 'Dimension X: The Outer Limit', '1950s', 'Classic radio drama that transported listeners to the far reaches of space and imagination...', 'Audio', 5, true, 2),
('2', 'The Day the Earth Stood Still', '1950s', 'A landmark film that brought thoughtful sci-fi to mainstream audiences with its message of peace...', 'Film', 5, true, 3);
