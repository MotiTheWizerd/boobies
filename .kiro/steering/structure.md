# Project Structure

## Root Directory Organization
```
├── app/                    # Next.js App Router directory
├── components/             # Reusable UI components
├── server/                 # Backend API server
├── public/                 # Static assets
├── documentations/         # Project documentation
└── config files           # Configuration files
```

## App Directory Structure (Next.js App Router)
```
app/
├── api/                    # API routes
│   ├── ads/               # Advertisement endpoints
│   ├── areas/             # Geographic area endpoints
│   ├── campaigns/         # Campaign management endpoints
│   ├── cities/            # City data endpoints
│   ├── clients/           # Client management endpoints
│   └── media/             # Media upload endpoints
├── [feature-pages]/       # Feature-specific pages
│   ├── discreet-apartments/
│   ├── escorts/
│   ├── office/            # Campaign management interface
│   └── image-uploader-*/  # Media upload demos
├── hooks/                 # Custom React hooks
├── services/              # Frontend service layer
├── utils/                 # Utility functions
├── globals.css            # Global styles and CSS variables
├── layout.tsx             # Root layout component
└── page.tsx               # Homepage component
```

## Components Directory Structure
```
components/
├── Areas/                 # Geographic selection components
├── Carousel/              # Reusable carousel component
├── Common/                # Shared utility components
├── DraggableGrid/         # Drag-and-drop media grid
├── FeaturedProfiles/      # Homepage featured content
├── Footer/                # Site footer
├── Header/                # Site header and navigation
├── HotProfiles/           # Trending profiles section
├── ImageUploader/         # Media upload components
├── MainMenu/              # Primary navigation
├── MediaManager/          # Media organization tools
├── Modal/                 # Modal dialog system
├── ProfileCard/           # Profile display components
├── SearchForm/            # Search and filtering
├── ThemeToggle/           # Dark/light theme switching
└── Upload/                # File upload utilities
```

## Server Directory Structure
```
server/
├── src/                   # Server source code
├── prisma/                # Database schema and migrations
├── node_modules/          # Server dependencies
├── package.json           # Server dependencies and scripts
└── setup scripts         # Database setup utilities
```

## Naming Conventions

### Files and Directories
- **Components**: PascalCase for component files (`ProfileCard.tsx`)
- **Pages**: lowercase with hyphens for routes (`discreet-apartments/`)
- **Utilities**: camelCase for utility files (`animations.ts`)
- **Hooks**: camelCase starting with "use" (`useHotProfiles.ts`)
- **Services**: camelCase ending with "Service" (`mediaService.ts`)
- **Types**: PascalCase for type definitions (`types.ts`)

### Code Conventions
- **React Components**: PascalCase (`FeaturedProfiles`)
- **Functions**: camelCase (`handleAreaChange`)
- **Variables**: camelCase (`selectedAreaId`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`profile-card`)
- **CSS Variables**: kebab-case with prefix (`--primary-color`)

## Import Patterns

### Path Aliases
- `@/` maps to project root for clean imports
- Example: `import Header from "@/components/Header"`

### Import Order
1. React and Next.js imports
2. Third-party library imports
3. Internal component imports (using @/ alias)
4. Relative imports
5. Type-only imports (using `import type`)

### Example Import Structure
```typescript
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { NextPage } from "next";

import Header from "@/components/Header";
import { pageTransition } from "@/app/utils/animations";

import "./styles.css";
```

## Component Architecture

### Component Structure
```typescript
// Component props interface
interface ComponentProps {
  // Props definition
}

// Main component
export default function Component({ props }: ComponentProps) {
  // Component logic
  return (
    // JSX with proper RTL support
  );
}
```

### Component Organization
- **Index Files**: Each component directory has an `index.tsx` for clean imports
- **Sub-components**: Related components grouped in same directory
- **Hooks**: Custom hooks in dedicated `hooks/` directories
- **Types**: Component-specific types in `types.ts` files
- **Styles**: Component-specific styles in `.module.css` files when needed

## Styling Architecture

### CSS Variable System
- Global variables in `app/globals.css`
- Theme-aware variables with light/dark mode support
- Component-specific variables when needed

### Tailwind Usage
- Utility-first approach with custom component classes
- Responsive design with mobile-first breakpoints
- RTL-aware spacing and layout utilities

### Theme Implementation
- CSS custom properties for dynamic theming
- Tailwind configuration extending base theme
- Component-level theme awareness

## Database Schema Patterns

### Model Naming
- PascalCase for model names (`User`, `Campaign`)
- camelCase for field names (`createdAt`, `campaignId`)
- Descriptive relationship names (`campaigns`, `ads`)

### Relationship Patterns
- Explicit join tables for many-to-many relationships (`AdArea`, `AdCity`)
- Cascade deletes for dependent data
- UUID primary keys for security and scalability

## API Route Structure
- RESTful endpoint design
- Consistent response formats
- Proper HTTP status codes
- Error handling middleware

## File Organization Principles
- **Feature-based grouping**: Related functionality grouped together
- **Reusability**: Shared components in dedicated directories
- **Separation of concerns**: Clear boundaries between UI, logic, and data
- **Scalability**: Structure supports growth without major refactoring
- **Developer experience**: Intuitive navigation and clear file purposes