# פאבליש בורד - לוח פרסום

This is a website template for a publication board site, built with Next.js and Tailwind CSS. The design is based on the provided reference.

## Features

- Responsive design
- RTL support for Hebrew
- Profile cards with badges
- Search form with advanced filtering
- Carousels for featured profiles
- Fallbacks for missing images

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Adding Real Images

Replace the placeholder files in the `public/images` directory with actual images:

- `logo.png` - Your site logo
- `placeholder-logo.png` - A fallback logo
- `background-pattern.png` - Background pattern for the site
- `placeholder.webp` - Default fallback for profile images
- `profile1.jpg` through `profile8.jpg` - Featured profile images
- `hot1.jpg` through `hot3.jpg` - Hot profile images

### Modifying Colors

The primary colors can be customized in `app/globals.css`:

```css
:root {
  --primary-color: #8a2be2; /* Purple */
  --secondary-color: #ff69b4; /* Pink */
  --background: #ffffff;
  --foreground: #171717;
}
```

### Adding Real Data

To add real profile data, edit:

- `app/components/FeaturedProfiles.tsx` - For the carousel profiles
- `app/components/HotProfiles.tsx` - For the featured hot profiles

## Components

- `Header` - Site header with language selection and authentication buttons
- `MainMenu` - Main navigation menu
- `SecondaryMenu` - Secondary menu for additional links
- `SearchForm` - Advanced search form
- `ProfileCard` - Circular profile cards with badges
- `HotProfiles` - Showcase for hot profile listings
- `Footer` - Site footer with links
- `PlaceholderImage` - Component for handling image fallbacks

## License

This template is for demonstration purposes only.

## Credits

Design based on the provided reference.
