# NFC Premium Business Profile

Standalone HTML/CSS/JavaScript implementation of a premium NFC digital business card.

## Files

- `index.html` - page markup
- `styles.css` - responsive premium UI
- `script.js` - profile data, interactions, vCard export, sharing/download
- `assets/profile/` - profile photographs
- `assets/logos/` - company logos
- `assets/business-cards/` - EXISTING visiting-card images

## Important

Put the real image files in:

```text
assets/profile/parishar.jpeg
assets/logos/business_logo.png
assets/business-cards/business_card.png
```

Then update the paths in `script.js` if your filenames differ.

The business card feature DOES NOT generate a new card. It downloads/shares the existing image file listed in:

```js
businessCardImage: "assets/business-cards/business_card.png"
```

## Creating another professional

Create another profile entry or replace the current `businessProfile` object.

Example:

```js
businessCardImage: "assets/business-cards/business_card.png"
```

The same UI remains unchanged.

## Multiple URL profiles

For a larger deployment, map URL slugs to profile data:

```text
/profile/parishar_rajbhandari
```

With plain HTML/JS this requires your hosting/server to route those URLs to the same page. The current UI is already data-driven so the same components can render any profile.

## Features

- Mobile-first premium UI
- Click-to-call
- WhatsApp with configurable message
- Email
- Website
- Google Maps
- Instagram / Facebook / LinkedIn / YouTube / TikTok
- Save Contact as `.vcf`
- vCard includes business details and attempts to embed the profile photo where supported
- Save existing visiting-card image
- Share existing visiting-card image using Web Share API when supported
- Share profile using Web Share API with clipboard fallback
- Responsive sticky mobile action bar
- Optional sections hide automatically when data is missing

## Running locally

Because browser file APIs can behave differently from a server, use a local web server for testing.

For example, with VS Code use the Live Server extension, or use:

```bash
python -m http.server 5500
```

Then visit:

```text
http://localhost:5500
```

## Deployment

Upload the folder to a static web host such as Netlify, Vercel, GitHub Pages, Cloudflare Pages, or your own hosting server.

Use HTTPS in production so browser share/clipboard APIs work reliably.

## Google Contacts note

A normal website cannot silently write directly into a user's Google Contacts. The `Save Contact` feature creates a standard `.vcf` contact file so the user can import/save it through the phone's normal Contacts interface.
