# ThemeToggle Component

## Part 1: Component Documentation

### Purpose

The ThemeToggle component provides a user interface for switching between light, dark, and system-based themes in a Next.js application. It enhances user experience by offering theme customization while maintaining consistent styling across the application.

### How It Works

#### Structure

The ThemeToggle component consists of two main parts:

1. **ThemeProvider** - A context provider that manages theme state
2. **ThemeToggle** - The UI button component for switching themes

#### Inputs (Props)

- The component doesn't accept any props directly
- It uses context from ThemeProvider to access theme state

#### Outputs/Events

- The component triggers theme changes throughout the application
- Updates the `data-theme` attribute on the document root element
- Persists user preferences in localStorage

#### Internal Logic

1. **Theme Management**:

   - Toggles between light and dark themes
   - Detects and respects system theme preferences
   - Persists theme choices in localStorage

2. **UI Interactions**:

   - Left click: Toggle between light and dark themes
   - Right click: Show theme selection menu with light, dark, and system options
   - Responsive animations with Framer Motion

3. **Responsive Design**:
   - Handles hydration safely with a mounted check
   - Manages responsive theme changes when system preferences change

#### Code Example

```tsx
// Basic usage in a layout component
import ThemeToggle from "@/app/components/ThemeToggle";
import { ThemeProvider } from "@/app/components/ThemeToggle/ThemeProvider";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <header>
        <nav>
          <ThemeToggle />
        </nav>
      </header>
      <main>{children}</main>
    </ThemeProvider>
  );
}
```

## Part 2: Implementation Instructions

### Installation

The ThemeToggle component is already part of the project and doesn't require additional installation.

### File Structure

- `/app/components/ThemeToggle/index.tsx` - Main UI component
- `/app/components/ThemeToggle/ThemeProvider.tsx` - Theme context provider

### Integration Steps

1. **Wrap your application with ThemeProvider**:

   Ensure the ThemeProvider is added at a high level in your component tree, typically in your root layout component:

   ```tsx
   // app/layout.tsx or other wrapper component
   import { ThemeProvider } from "@/app/components/ThemeToggle/ThemeProvider";

   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           <ThemeProvider>{children}</ThemeProvider>
         </body>
       </html>
     );
   }
   ```

2. **Add the ThemeToggle component** where you want the toggle button to appear:

   ```tsx
   import ThemeToggle from "@/app/components/ThemeToggle";

   export default function Navbar() {
     return (
       <nav className="flex justify-between items-center p-4">
         <div className="logo">Your Logo</div>
         <div className="controls">
           <ThemeToggle />
         </div>
       </nav>
     );
   }
   ```

3. **Style your application based on theme**:

   The theme is applied via the `data-theme` attribute on the root element. Use CSS or Tailwind to respond to theme changes:

   ```css
   /* For custom CSS */
   [data-theme="dark"] {
     --background: #121212;
     --text: #ffffff;
   }

   [data-theme="light"] {
     --background: #ffffff;
     --text: #121212;
   }
   ```

   With Tailwind, use the `dark:` variant which automatically works with the theme:

   ```tsx
   <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
     Content here
   </div>
   ```

### Dependencies

- React (with useState, useEffect, useContext)
- Framer Motion for animations
- TailwindCSS for styling

### Customization Options

1. **Default Theme**:

   - Modify the default theme in ThemeProvider.tsx
   - Change `const [theme, setThemeState] = useState<Theme>("dark")` to use "light" as default

2. **Styling**:

   - Customize the appearance by modifying the CSS classes in index.tsx
   - Change icon colors by adjusting the className properties

3. **Behavior**:
   - Adjust context menu behavior in the useEffect with the clickOutside handler
   - Modify animation properties in the Framer Motion components

### Real-World Usage Example

Here's a complete example showing the ThemeToggle in a navbar with proper SEO considerations:

```tsx
// app/components/Navbar.tsx
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-xl font-bold">
          Your Website
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

The ThemeToggle enhances accessibility and user experience by allowing visitors to choose their preferred theme, which also benefits SEO through improved engagement metrics and accessibility scores.
