# Chtaura - Premium Mediterranean Foods

A modern web application for Chtaura, showcasing premium Mediterranean food products with elegant design and seamless user experience.

## 🚀 Tech Stack

- **Framework**: Next.js 15.1.3 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Build Tool**: Next.js built-in bundling

## 🎨 Features

- Premium brand showcase with product catalogs
- Responsive design for all devices  
- Smooth animations and transitions
- Contact and partnership forms
- Distribution and retail information
- About company story and values

## 🖼️ Branding

The favicon and app icons use the official Chtaura logo (`/public/assets/logo.png`). The branding includes:

- **Primary Colors**: Mediterranean-inspired color palette
- **Typography**: Display fonts for headings, clean sans-serif for body text
- **Logo**: Available in `/public/assets/logo.png`
- **Favicon**: Configured in app metadata to use the brand logo

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components  
│   └── sections/       # Page sections
├── pages/              # Route pages
├── data/               # Static data (brands, products)
├── hooks/              # Custom React hooks
└── lib/                # Utilities and helpers

public/
├── assets/             # Images and media files
└── manifest.json       # PWA configuration
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Start production server
npm start
```

## 📱 PWA Support

The app includes a web manifest for Progressive Web App capabilities with proper favicon configurations across all devices and platforms.
