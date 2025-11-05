# CDN Image Integration Guide

This guide explains how the SF Supernova site integrates with your CDN for seamless image management.

## Overview

The site now uses a centralized CDN for all images, making it easy to manage and serve images efficiently. All image paths are automatically constructed using the CDN base URL configured in your environment variables.

## CDN Configuration

### Base URL
```
https://cdn.networklayer.co.uk/SFSupernova/images/
```

This is configured in `.env.local` as:
```bash
NEXT_PUBLIC_CDN_BASE_URL=https://cdn.networklayer.co.uk/SFSupernova/images
```

## How It Works

The site uses a centralized utility function (`getCdnImageUrl`) that:

1. **Handles Full URLs**: If an image path starts with `http://` or `https://`, it passes through unchanged (for legacy Wikimedia/NASA images)
2. **Constructs CDN URLs**: For relative paths, it prepends the CDN base URL
3. **Works Everywhere**: All components automatically use this utility

### Example
```javascript
// Database stores: "covers/war-of-worlds.jpg"
// Site serves: "https://cdn.networklayer.co.uk/SFSupernova/images/covers/war-of-worlds.jpg"
```

## Directory Structure on CDN

Organize your images on the CDN with this structure:

```
https://cdn.networklayer.co.uk/SFSupernova/images/
├── covers/              # Book cover images
│   ├── war-of-worlds.jpg
│   ├── time-machine.jpg
│   └── ...
├── gallery/             # Gallery images (optional)
│   ├── SCI-FI-1926-001.jpg
│   └── ...
└── logo/                # Logo files
    ├── logo-full.svg
    ├── logo-compact.svg
    └── ...
```

## Adding New Images

### Method 1: For Database-Driven Images (Gallery, Covers, etc.)

1. **Upload image to CDN** with your preferred method (FTP, rsync, etc.)
   - Place in appropriate directory (e.g., `covers/`, `gallery/`)
   - Use a consistent naming convention

2. **Update database** with relative path:
   ```sql
   -- Example: Adding a new gallery image
   INSERT INTO images (
     catalog_number,
     title,
     file_path,
     thumbnail_path,
     year
   ) VALUES (
     'SCI-FI-1950-042',
     'Amazing Stories - June 1950',
     'gallery/SCI-FI-1950-042.jpg',  -- Relative path!
     'gallery/thumbs/SCI-FI-1950-042.jpg',  -- Optional thumbnail
     1950
   );
   ```

3. **The site automatically** constructs the full CDN URL when serving the image

### Method 2: For Static Cover Images (Free Library)

1. **Upload to CDN**: Upload to `covers/` directory with the appropriate filename
2. **Update mapping**: Edit `/app/free-library/page.tsx` to add the mapping:
   ```javascript
   const coverFilenames: { [key: string]: string } = {
     // ... existing mappings
     "new-book-id": "filename-on-cdn",
   };
   ```

## Migrating Existing Images

### Step 1: Upload Images to CDN

Transfer all images from `/public/covers/` and other directories to your CDN:

```bash
# Example using rsync (adjust paths to match your setup)
rsync -avz public/covers/ user@cdn.networklayer.co.uk:/path/to/SFSupernova/images/covers/
```

### Step 2: Update Database Paths

For images currently stored with full URLs (like Wikimedia), you have two options:

**Option A: Keep Full URLs** (Recommended for external sources)
- No action needed! The utility function passes through full URLs unchanged
- Good for: Wikimedia, NASA, or other external sources you don't control

**Option B: Migrate to CDN** (Recommended for images you host)

1. Download images from current URLs
2. Upload to your CDN
3. Update database with relative paths:

```sql
-- Example: Update a single image
UPDATE images
SET file_path = 'gallery/SCI-FI-1926-001.jpg'
WHERE catalog_number = 'SCI-FI-1926-001';

-- Example: Bulk update for migrated images
UPDATE images
SET file_path = CONCAT('gallery/', catalog_number, '.jpg')
WHERE file_path LIKE 'https://upload.wikimedia.org%'
AND catalog_number IS NOT NULL;
```

### Step 3: Test

1. Restart your development server to pick up `.env.local` changes
2. Visit pages with images to verify they load correctly
3. Check browser DevTools Network tab to confirm images are loading from your CDN

## File Naming Conventions

### Cover Images
Format: `{book-slug}.jpg`
- Example: `war-of-worlds.jpg`, `time-machine.jpg`
- Located in: `covers/` directory

### Gallery Images
Format: `{catalog-number}.jpg`
- Example: `SCI-FI-1926-001.jpg`, `SCI-FI-1950-042.jpg`
- Located in: `gallery/` directory
- Optional thumbnails in: `gallery/thumbs/` directory

### Logos
Format: `{variant}.svg`
- Example: `logo-full.svg`, `logo-compact.svg`
- Located in: `logo/` directory

## Utility Functions Reference

All utility functions are in `/lib/imageUrl.ts`:

### `getCdnImageUrl(path: string)`
Constructs a full CDN URL from a relative path, or passes through full URLs unchanged.

```javascript
getCdnImageUrl('covers/war-of-worlds.jpg')
// Returns: https://cdn.networklayer.co.uk/SFSupernova/images/covers/war-of-worlds.jpg

getCdnImageUrl('https://upload.wikimedia.org/...')
// Returns: https://upload.wikimedia.org/... (unchanged)
```

### `getCoverImageUrl(bookId: string, extension?: string)`
Constructs a cover image URL from a book ID.

```javascript
getCoverImageUrl('war-of-worlds')
// Returns: https://cdn.networklayer.co.uk/SFSupernova/images/covers/war-of-worlds.jpg
```

### `getGalleryImageUrl(catalogNumber: string, extension?: string)`
Constructs a gallery image URL from a catalog number.

```javascript
getGalleryImageUrl('SCI-FI-1926-001')
// Returns: https://cdn.networklayer.co.uk/SFSupernova/images/gallery/SCI-FI-1926-001.jpg
```

### `getLogoUrl(variant: string, extension?: string)`
Constructs a logo URL from a variant name.

```javascript
getLogoUrl('logo-full')
// Returns: https://cdn.networklayer.co.uk/SFSupernova/images/logo/logo-full.svg
```

## Components Updated

The following components now use the CDN utility:

- `/app/page.tsx` - Home page featured images
- `/app/gallery/page.tsx` - Main gallery grid
- `/app/gallery/[catalog]/page.tsx` - Gallery detail pages
- `/app/galleries/page.tsx` - Decade galleries
- `/app/free-library/page.tsx` - Free library book covers
- `/app/vault/admin/page.tsx` - Admin image management
- `/app/vault/dashboard/page.tsx` - User dashboard
- `/app/vault/folders/[slug]/page.tsx` - User folder images

## Next.js Configuration

The CDN domain is whitelisted in `next.config.ts` for Next.js Image Optimization:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.networklayer.co.uk',
      pathname: '/SFSupernova/images/**',
    },
    // ... other patterns
  ],
}
```

## Troubleshooting

### Images Not Loading

1. **Check CDN URL**: Verify files exist at the constructed URL
2. **Check Environment Variable**: Ensure `NEXT_PUBLIC_CDN_BASE_URL` is set in `.env.local`
3. **Restart Server**: After changing `.env.local`, restart the Next.js dev server
4. **Check Console**: Look for 404 errors in browser DevTools
5. **Verify Paths**: Ensure database paths are relative, not absolute (unless intentionally full URLs)

### CORS Issues

If you encounter CORS errors, configure your CDN to allow requests from your domain:

```
Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: GET
```

### Performance Optimization

For better performance:

1. **Use WebP format** where possible (smaller file sizes)
2. **Generate thumbnails** for gallery views (faster loading)
3. **Enable CDN caching** with appropriate cache headers
4. **Consider image optimization** tools before upload

## Best Practices

1. **Consistent naming**: Use lowercase with hyphens for filenames
2. **Relative paths in database**: Store relative paths, not full URLs (unless external)
3. **Backup images**: Keep a local backup of all CDN images
4. **Version control**: Don't commit images to Git, only code
5. **Test before deploy**: Verify images load in development before deploying

## Quick Reference: Adding a New Book Cover

1. Upload `new-book.jpg` to CDN `covers/` directory
2. Add to Free Library page:
   ```javascript
   // In /app/free-library/page.tsx
   const coverFilenames = {
     // ...
     "new-book": "new-book",
   };
   ```
3. Add book data to `books` array in same file
4. Done! Image will automatically load from CDN

## Quick Reference: Adding a New Gallery Image

1. Upload `SCI-FI-YYYY-NNN.jpg` to CDN `gallery/` directory
2. Insert into database:
   ```sql
   INSERT INTO images (catalog_number, title, file_path, year)
   VALUES ('SCI-FI-YYYY-NNN', 'Title', 'gallery/SCI-FI-YYYY-NNN.jpg', YYYY);
   ```
3. Done! Image appears in gallery automatically

## Support

For questions or issues with CDN integration:
- Check this guide first
- Review `/lib/imageUrl.ts` for utility function details
- Inspect browser Network tab for URL construction
- Verify `.env.local` configuration
