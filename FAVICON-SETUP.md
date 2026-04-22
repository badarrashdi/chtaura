# Favicon Generation Instructions

To create optimized favicon files from your logo, follow these steps:

## Required Files

Based on your logo at `/public/assets/logo.png`, you should generate these favicon files:

1. **favicon.ico** (16x16, 32x32, 48x48) - Replace existing file
2. **favicon-16x16.png** - 16x16 pixels  
3. **favicon-32x32.png** - 32x32 pixels
4. **apple-touch-icon.png** - 180x180 pixels (for iOS)
5. **android-chrome-192x192.png** - 192x192 pixels
6. **android-chrome-512x512.png** - 512x512 pixels

## Generation Tools

### Online Tools:
- **Favicon.io** (https://favicon.io/) - Upload your logo.png
- **RealFaviconGenerator** (https://realfavicongenerator.net/)

### Command Line:
```bash
# Using ImageMagick
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png  
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png

# Create ICO file
convert logo.png -resize 16x16 -resize 32x32 -resize 48x48 favicon.ico
```

## Current Setup

The favicon is currently configured in `app/layout.tsx` metadata to use your Chtaura logo. The web app manifest (`/public/manifest.json`) is also set up for PWA support.

Once you generate the optimized favicon files, place them in the `/public` directory and they will be automatically served by Next.js.