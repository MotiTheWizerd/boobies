# Technology Stack

## Frontend Framework
- **Next.js 15.3.0**: React-based full-stack framework with App Router
- **React 19.0.0**: Latest React with concurrent features and improved performance
- **TypeScript 5**: Strict typing for enhanced development experience and code reliability

## Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework for rapid UI development
- **Tailwind Animate**: Animation utilities for smooth transitions
- **Custom CSS Variables**: Comprehensive theming system with dark/light mode support
- **Framer Motion 11.0.0**: Advanced animations and gesture handling
- **Class Variance Authority**: Type-safe component variants
- **Tailwind Merge & CLSX**: Conditional class name utilities

## UI Components & Interactions
- **Lucide React**: Modern icon library with consistent design
- **React Icons**: Additional icon sets for comprehensive coverage
- **@dnd-kit**: Drag and drop functionality for media management
- **React Intersection Observer**: Efficient scroll-based interactions
- **React Infinite Scroll**: Performance-optimized infinite loading
- **Sonner**: Modern toast notification system

## Backend & Database
- **Node.js with Express**: RESTful API server architecture
- **Prisma 6.6.0**: Type-safe database ORM with PostgreSQL
- **PostgreSQL**: Primary database for structured data storage
- **Prisma Client**: Auto-generated type-safe database client

## Authentication & Security
- **bcryptjs**: Password hashing and authentication
- **Helmet**: Security middleware for Express
- **CORS**: Cross-origin resource sharing configuration
- **UUID**: Secure unique identifier generation

## File Management & Media
- **Multer**: File upload handling middleware
- **Custom Media Service**: Organized file storage and retrieval system
- **Image Optimization**: Next.js built-in image optimization with multiple formats (AVIF, WebP)

## Development Tools
- **ESLint**: Code linting with Next.js configuration
- **Autoprefixer**: CSS vendor prefix automation
- **PostCSS**: CSS processing and optimization
- **Nodemon**: Development server auto-restart
- **Winston**: Structured logging system
- **Morgan**: HTTP request logging middleware

## Package Management
- **PNPM**: Fast, disk space efficient package manager
- **Workspace Configuration**: Monorepo setup for frontend/backend coordination

## Internationalization & Accessibility
- **Google Fonts**: Open Sans with Hebrew subset support
- **RTL Support**: Native right-to-left text direction for Hebrew
- **Responsive Design**: Mobile-first approach with comprehensive breakpoints
- **Semantic HTML**: Accessibility-compliant markup structure

## Performance & Optimization
- **Next.js Image Optimization**: Automatic image format selection and sizing
- **Code Splitting**: Automatic bundle optimization
- **CSS-in-JS**: Scoped styling with performance optimization
- **Lazy Loading**: Component and route-based lazy loading
- **Caching Strategies**: Browser and server-side caching implementation

## Development Constraints
- **Strict TypeScript**: All code must be properly typed
- **Component-Based Architecture**: Reusable, modular component design
- **Mobile-First**: All features must work seamlessly on mobile devices
- **RTL Compatibility**: All UI components must support right-to-left layouts
- **Theme Consistency**: All components must support both light and dark themes
- **Performance Budget**: Maintain fast loading times and smooth interactions

## Preferred Libraries
- **State Management**: React built-in state (useState, useContext) over external libraries
- **Styling**: Tailwind CSS classes over styled-components or CSS modules
- **Animations**: Framer Motion for complex animations, CSS transitions for simple effects
- **Forms**: Native HTML forms with custom validation over heavy form libraries
- **HTTP Requests**: Native fetch API over axios or other HTTP clients
- **Date Handling**: date-fns for date manipulation and formatting