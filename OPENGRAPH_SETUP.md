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

### Site Information (from https://www.noahlynch.com/)
- **Domain**: `https://www.noahlynch.com`
- **Artist**: Noah Lynch (Mississippi-born singer-songwriter)
- **Latest Album**: "Honest" (Released May 9, 2025)
- **Record Label**: Ready Records
- **Style**: Blues, Neo-Rock, influenced by John Mayer & Stevie Ray Vaughan
- **YouTube**: Confirmed @noahlynch channel

### OpenGraph Tags (Facebook, LinkedIn, Discord, Slack)
```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="https://www.noahlynch.com" />
<meta property="og:site_name" content="Noah Lynch Music" />
<meta property="og:title" content="Noah Lynch - Singer-Songwriter & Musician" />
<meta property="og:description" content="Experience the raw talent and soulful music of Noah Lynch..." />
<meta property="og:image" content="https://www.noahlynch.com/noah-portrait.jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Noah Lynch - Mississippi-born Singer-Songwriter" />
```

### Twitter Cards (X Platform)
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@noahlynchmusic" />
<meta name="twitter:creator" content="@noahlynchmusic" />
<meta name="twitter:title" content="Noah Lynch - Singer-Songwriter & Musician" />
<meta name="twitter:description" content="Experience the raw talent..." />
<meta name="twitter:image" content="https://www.noahlynch.com/noah-portrait.jpeg" />
```

### Discord Enhancement
```html
<meta name="theme-color" content="#d97706" />
```

### Music-Specific Meta Tags
```html
<meta property="music:creator" content="Noah Lynch" />
<meta property="music:album" content="Honest" />
<meta property="music:release_date" content="2025-05-09" />
```

## 📝 Required Actions

### 1. Extract Social Media Handles
Check the source code of [https://www.noahlynch.com/](https://www.noahlynch.com/) for actual social media handles and update:

```typescript
twitter: {
  site: "@actual_twitter_handle", // Replace placeholder
  creator: "@actual_twitter_handle",
},
```

Update JSON-LD structured data social links:
```typescript
sameAs: [
  "https://youtube.com/@noahlynch", // ✓ Confirmed
  "https://twitter.com/actual_handle", // Extract from source
  "https://instagram.com/actual_handle", // Extract from source
  "https://facebook.com/actual_handle", // Extract from source
],
```

### 2. Create Professional OpenGraph Images
#### `/public/og-image.jpg` (1200x630px)
Suggested content based on Noah's brand:
- Noah's portrait or "Honest" album artwork
- Site title "Noah Lynch"
- Tagline: "Mississippi Singer-Songwriter • Ready Records"
- Brand colors (amber/black theme from site)

#### `/public/og-image-square.jpg` (1080x1080px)
Square version for Instagram stories and certain platforms.

### 3. Current Fallback Images
The implementation currently uses existing images:
- Primary: `/noah-portrait.jpeg`
- Secondary: `/noah-studio.jpeg`

## 🧪 Testing Your OpenGraph Setup

### Facebook Sharing Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter: `https://www.noahlynch.com`
3. Click "Debug" to see how Facebook displays the link

### Twitter Card Validator
1. Visit: https://cards-dev.twitter.com/validator
2. Enter: `https://www.noahlynch.com`
3. Preview how Twitter displays the card

### LinkedIn Post Inspector
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter: `https://www.noahlynch.com`
3. See LinkedIn's preview

### General Preview Tools
- **OpenGraph.xyz**: https://www.opengraph.xyz
- **Social Share Preview**: Multiple platforms at once

## 🎨 Image Design Tips

### OpenGraph Image Best Practices for Noah:
1. **Feature "Honest" album artwork** - his latest release
2. **Mississippi roots** - incorporate his Southern heritage
3. **Ready Records branding** - his record label
4. **Blues/Neo-Rock aesthetic** - match his musical style
5. **Professional musician image** - guitar, studio setting

### Suggested Content Elements:
- Noah's portrait with guitar
- "Honest" album cover
- "Mississippi Singer-Songwriter" tagline
- Ready Records logo
- Website URL: www.noahlynch.com

## 📊 Expected Results

When Venus and others share Noah's site:
- **Professional music artist presentation** across all platforms
- **"Honest" album promotion** with proper music metadata
- **Ready Records brand visibility** in structured data
- **Mississippi artist identity** highlighted in descriptions
- **Enhanced music discovery** through proper schema markup

This setup ensures maximum impact when Noah's music is shared, driving engagement and professional presentation across all social media platforms.