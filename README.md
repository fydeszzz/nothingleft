# Nothing Left — Give what you have. Help where it matters.

~ Find Donation Sites · Drop Off What You Have · Help Your Neighborhood ~

## Features
- Search donation sites near any address or use GPS location
- Live data from OpenStreetMap via Overpass API, with sample data fallback
- Filter sites by category (food, clothes, household, toiletries, toys, electronics, furniture)
- Smart distance filter — auto-expands from 10mi → 25mi → 50mi based on available results
- Three view modes: list, split (map + list), and full map
- Numbered map markers and matching card badges for easy navigation
- Site detail modal with mini-map preview, hours, address, and directions link
- Urgent need tags highlight sites with critical donation shortages

## Tech Stack
- **React 18** + **Vite** (single-page web app, no backend)
- Live charity data from **Overpass API** (OpenStreetMap)
- Address geocoding via **Nominatim** (OpenStreetMap, no API key required)
- Interactive maps via **Leaflet.js**
- Dev-only tweaks panel (tree-shaken out of production builds)

## Running Locally

```bash
npm install      # first time only
npm run dev      # starts dev server at localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

## Project Structure

```
nothing-left/
├── src/
│   ├── main.jsx              # React entry point (createRoot) + global CSS import
│   ├── App.jsx               # Root component — routing, theme, geocoding
│   ├── index.css             # CSS variables, global reset, keyframe animations
│   ├── constants/
│   │   └── categories.js     # CATEGORIES list + logo color arrays
│   ├── mocks/
│   │   └── sites.js          # Sample data (used when API returns no results)
│   ├── services/
│   │   ├── geocoding.js      # Nominatim forward + reverse geocoding
│   │   └── overpass.js       # Overpass API fetch + OSM element mapper
│   ├── utils/
│   │   └── security.js       # safeUrl, safeTel, hexToRgba helpers
│   ├── components/
│   │   ├── ColorfulLogo.jsx  # Crayon-style animated logo
│   │   ├── Pin.jsx           # Location pin icon
│   │   ├── Badge.jsx         # Colored category/tag badge
│   │   ├── CategoryChip.jsx  # Filter chip with category color
│   │   ├── CapacityBar.jsx   # Donation capacity progress bar
│   │   ├── MapView.jsx       # Leaflet map with numbered markers
│   │   ├── SiteCard.jsx      # Donation site list card
│   │   ├── SiteMapPreview.jsx# Mini Leaflet map shown in site detail
│   │   ├── SiteDetail.jsx    # Site detail modal (centered overlay)
│   │   └── HeroCarousel.jsx  # Landing page photo carousel
│   ├── pages/
│   │   ├── Landing.jsx       # Home page — address search + hero
│   │   └── Results.jsx       # Search results — list/split/map views
│   └── dev/
│       └── TweaksPanel.jsx   # Dev-only theme & layout tweaks panel
│
├── public/
│   └── images/
│       ├── hero-1.jpg … hero-6.jpg   # Hero carousel photos
│       └── pin.png                   # Location pin icon
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Pages

| Page | Component | Description |
|---|---|---|
| Landing | `Landing` | Address search, GPS, hero carousel |
| Results | `Results` | Donation site list, map, and filters |

## Donation Categories

| Category | Color |
|---|---|
| Food | `#E63946` |
| Clothes | `#3A86FF` |
| Household | `#F77F00` |
| Toiletries | `#43AA8B` |
| Toys | `#F15BB5` |
| Electronics | `#8338EC` |
| Furniture | `#FFB703` |

## Data Sources

| Source | Purpose |
|---|---|
| Overpass API | Live charity shop, food bank, and social facility data |
| Nominatim | Address geocoding and reverse geocoding |
| OpenStreetMap Tiles | Map tile rendering via Leaflet |

## Changelog

### 2026-05-10
- Initial release: landing page, results page with list/split/map views

---
## 👤 Author
Ricy Hsu

---
## 📅 Last Updated
May 10, 2026
