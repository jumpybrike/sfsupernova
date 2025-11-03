-- Migration: Create Reviews Table
-- Stores featured reviews for books, films, and audio dramas

-- CREATE REVIEWS TABLE
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255), -- Creator/Director/Producer
  decade VARCHAR(20), -- '1930s-1940s', '1950s', '1960s', '1970s'
  category VARCHAR(50) NOT NULL, -- 'Books', 'Film', 'Audio'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  excerpt TEXT NOT NULL, -- Short teaser text for cards
  content TEXT, -- Full review content (optional, for future expansion)
  review_date DATE, -- Date the review was published
  is_featured BOOLEAN DEFAULT false, -- Show on homepage
  slug VARCHAR(255) UNIQUE, -- URL-friendly version for future detail pages
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES for Performance
CREATE INDEX idx_reviews_category ON reviews(category);
CREATE INDEX idx_reviews_decade ON reviews(decade);
CREATE INDEX idx_reviews_is_featured ON reviews(is_featured) WHERE is_featured = true;
CREATE INDEX idx_reviews_rating ON reviews(rating DESC);
CREATE INDEX idx_reviews_review_date ON reviews(review_date DESC);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Reviews are viewable by everyone
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Admins can insert reviews
CREATE POLICY "Admins can insert reviews"
  ON reviews FOR INSERT
  WITH CHECK ((SELECT is_admin FROM users WHERE id = auth.uid()));

-- Admins can update reviews
CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  USING ((SELECT is_admin FROM users WHERE id = auth.uid()));

-- Insert initial reviews data
INSERT INTO reviews (title, author, decade, category, rating, excerpt, review_date, is_featured, slug) VALUES
  (
    'Foundation by Isaac Asimov',
    'Isaac Asimov',
    '1950s',
    'Books',
    5,
    'Asimov''s Foundation is more than just a novel—it''s a vision of humanity''s future spanning millennia. Through the lens of psychohistory, a mathematical science that can predict the future of large populations, we witness the fall of a galactic empire and the calculated effort to preserve knowledge...',
    '2024-10-15',
    true,
    'foundation-isaac-asimov'
  ),
  (
    'The Day the Earth Stood Still',
    'Robert Wise',
    '1950s',
    'Film',
    5,
    'A masterpiece of thoughtful science fiction that transcends its era. When Klaatu and his robot companion Gort arrive on Earth with a message of peace, they encounter humanity at its most fearful and xenophobic. This Cold War parable remains startlingly relevant...',
    '2024-10-12',
    true,
    'the-day-the-earth-stood-still'
  ),
  (
    'Dimension X: The Outer Limit',
    'NBC Radio',
    '1950s',
    'Audio',
    5,
    'This episode of Dimension X showcases the power of audio drama to transport listeners to alien worlds. The sound design, voice acting, and atmospheric music create an immersive experience that rivals any visual medium of its time...',
    '2024-10-10',
    true,
    'dimension-x-the-outer-limit'
  ),
  (
    'Dune by Frank Herbert',
    'Frank Herbert',
    '1960s',
    'Books',
    5,
    'Herbert''s sprawling epic combines desert ecology, feudal politics, and messianic prophecy into a rich tapestry that defined modern space opera. The world-building is meticulous, the characters complex, and the themes timeless...',
    '2024-10-08',
    false,
    'dune-frank-herbert'
  ),
  (
    'Forbidden Planet',
    'Fred M. Wilcox',
    '1950s',
    'Film',
    4,
    'A landmark in science fiction cinema that brought Shakespearean themes to the stars. Robby the Robot became an icon, and the electronic score by Louis and Bebe Barron was revolutionary...',
    '2024-10-05',
    false,
    'forbidden-planet'
  ),
  (
    'X Minus One: A Logic Named Joe',
    'NBC Radio',
    '1950s',
    'Audio',
    4,
    'A remarkably prescient story about networked computers with access to all human knowledge. Written in 1946, it essentially predicted the internet and some of its dangers...',
    '2024-10-03',
    false,
    'x-minus-one-a-logic-named-joe'
  );

COMMENT ON TABLE reviews IS 'Reviews of classic science fiction books, films, and audio dramas';
COMMENT ON COLUMN reviews.is_featured IS 'When true, review appears on homepage featured section';
COMMENT ON COLUMN reviews.excerpt IS 'Short excerpt/teaser for card display';
COMMENT ON COLUMN reviews.content IS 'Full review content (for future detail pages)';
