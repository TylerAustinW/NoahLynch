# OpenGraph & Social Media Setup Guide

This guide explains the OpenGraph implementation for optimal social media sharing across all major platforms.

## 🎯 Platform Coverage

The current implementation supports:
- **Facebook** - OpenGraph standard
- **LinkedIn** - Uses OpenGraph tags
- **Discord** - OpenGraph + theme color
- **Slack** - OpenGraph with fallbacks
- **X (Twitter)** - Twitter Cards + OpenGraph fallback
- **Instagram** - Basic OpenGraph support

## 📐 Image Requirements

Based on [social media optimization best practices](https://opengraph.xyz) and [platform specifications](https://w3things.com/blog/open-graph-meta-tags/):

### Primary OpenGraph Image
- **Size**: 1200x630px (1.91:1 ratio)
- **Format**: JPG or PNG
- **File size**: Under 8MB
- **Location**: `/public/og-image.jpg`

### Square Format (Instagram/Secondary)
- **Size**: 1080x1080px (1:1 ratio)
- **Format**: JPG or PNG
- **File size**: Under 8MB
- **Location**: `/public/og-image-square.jpg`

## 🔧 Current Implementation

### OpenGraph Tags (Facebook, LinkedIn, Discord, Slack)
```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="https://noahlynchmusic.com" />
<meta property="og:site_name" content="Noah Lynch Music" />
<meta property="og:title" content="Noah Lynch Music" />
<meta property="og:description" content="Experience the raw talent and soulful music of Noah Lynch..." />
<meta property="og:image" content="https://noahlynchmusic.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Noah Lynch - Singer-Songwriter and Musician" />
```

### Twitter Cards (X Platform)
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@noahlynchmusic" />
<meta name="twitter:creator" content="@noahlynchmusic" />
<meta name="twitter:title" content="Noah Lynch Music" />
<meta name="twitter:description" content="Experience the raw talent..." />
<meta name="twitter:image" content="https://noahlynchmusic.com/og-image.jpg" />
```

### Discord Enhancement
```html
<meta name="theme-color" content="#d97706" />
```

## 📝 Required Actions

### 1. Create OpenGraph Images
You need to create these image files:

#### `/public/og-image.jpg` (1200x630px)
Suggested content:
- Noah's photo or album artwork
- Site title "Noah Lynch Music"
- Tagline: "Singer-Songwriter • Live Studio Sessions"
- Brand colors (amber/black theme)

#### `/public/og-image-square.jpg` (1080x1080px)
Square version for Instagram stories and certain platforms.

### 2. Update Social Media Handles
In `app/layout.tsx`, replace placeholder handles:
```typescript
twitter: {
  site: "@noahlynchmusic", // Replace with actual handle
  creator: "@noahlynchmusic",
},
```

Update JSON-LD structured data social links:
```typescript
sameAs: [
  "https://youtube.com/@noahlynch", // ✓ Already correct
  "https://twitter.com/noahlynchmusic", // Update with real handle
  "https://instagram.com/noahlynchmusic", // Update with real handle
  "https://facebook.com/noahlynchmusic", // Update with real handle
],
```

### 3. Update Domain
Replace `https://noahlynchmusic.com` with the actual domain in:
- `siteUrl` constant
- `metadataBase` URL

## 🧪 Testing Your OpenGraph Setup

### Facebook Sharing Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click "Debug" to see how Facebook will display your link

### Twitter Card Validator
1. Visit: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Preview how Twitter will display your card

### LinkedIn Post Inspector
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter your URL
3. See LinkedIn's preview

### General Preview Tools
- **OpenGraph.xyz**: https://www.opengraph.xyz
- **Social Share Preview**: Multiple platforms at once

## 🎨 Image Design Tips

### OpenGraph Image Best Practices:
1. **Bold, readable text** - looks good at small sizes
2. **High contrast** - ensure text is visible
3. **Consistent branding** - use Noah's brand colors
4. **Safe area** - keep important content in center 80%
5. **Mobile-friendly** - readable on small screens

### Suggested Tools:
- **Canva** - Templates for social media
- **Figma** - Professional design tool
- **Photoshop** - Advanced editing
- **GIMP** - Free alternative

## 📊 Expected Results

When properly implemented, sharing Noah's site will show:
- **Professional preview cards** on all platforms
- **Consistent branding** across social media
- **Higher click-through rates** from social shares
- **Better engagement** with rich media previews
- **Enhanced SEO** with structured data

This setup ensures Venus and others see a polished, professional representation of Noah's brand when sharing his music across any social platform.