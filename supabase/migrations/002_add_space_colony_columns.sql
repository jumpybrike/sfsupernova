-- Migration: Add Space Colony Artwork Fields
-- Adds support for 1970s NASA space habitat concept art (O'Neill cylinders, lunar bases, etc.)

-- Add new columns for space colony artwork classification
ALTER TABLE images
  ADD COLUMN IF NOT EXISTS colony_type VARCHAR(100), -- 'cylinder', 'torus', 'lunar-base', 'mars-base', 'bernal-sphere', 'asteroid-habitat'
  ADD COLUMN IF NOT EXISTS artist_featured BOOLEAN DEFAULT false, -- Don Davis, Rick Guidice, etc.
  ADD COLUMN IF NOT EXISTS habitat_feature VARCHAR(100); -- 'interior', 'exterior', 'construction', 'agriculture', 'transport'

-- Add index for colony type searches
CREATE INDEX IF NOT EXISTS idx_images_colony_type ON images(colony_type) WHERE colony_type IS NOT NULL;

-- Add index for featured artists
CREATE INDEX IF NOT EXISTS idx_images_artist_featured ON images(artist_featured) WHERE artist_featured = true;

-- Add index for habitat features
CREATE INDEX IF NOT EXISTS idx_images_habitat_feature ON images(habitat_feature) WHERE habitat_feature IS NOT NULL;

-- NOTE: Year constraint removed - allows both vintage pulp (1890s-1960s) AND space colony art (1970s)
-- If you want to enforce 1970s only for NEW space colony images, handle this in application logic instead

COMMENT ON COLUMN images.colony_type IS 'Type of space habitat: cylinder, torus, lunar-base, mars-base, bernal-sphere, asteroid-habitat';
COMMENT ON COLUMN images.artist_featured IS 'Featured space artist like Don Davis or Rick Guidice';
COMMENT ON COLUMN images.habitat_feature IS 'View type: interior, exterior, construction, agriculture, transport';
