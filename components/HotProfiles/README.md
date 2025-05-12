# HotProfiles Infinite Gallery

This component implements an infinite scrolling gallery for hot profiles. It integrates with the main page scroll, loading more profiles as the user scrolls down the page.

## Current Implementation

Currently, we're using a custom implementation (`MainPageScrollGallery`) that detects when the user scrolls near the bottom of the page and loads more content. This works well for a moderate amount of data and provides a seamless experience as part of the main page flow.

## Upgrading to React Virtuoso

To upgrade to the React Virtuoso implementation:

1. Install React Virtuoso:

   ```bash
   npm install react-virtuoso
   ```

2. Modify the `HotProfilesGallery.tsx` file:

   - Uncomment the import at the top: `import { Virtuoso } from "react-virtuoso";`
   - Comment out or remove the `MainPageScrollGallery` component
   - Uncomment the React Virtuoso implementation at the bottom of the component

3. The implementation uses these key features of React Virtuoso:
   - `useWindowScroll` prop for integrating with the main page scroll
   - `endReached` for infinite loading
   - Custom components for loading states
   - Higher `overscan` value to preload more content

## Benefits of React Virtuoso

- Better performance with large datasets
- Only renders visible items in the DOM
- Automatic handling of scroll position
- Built-in support for variable height items
- Optimized for React with minimal re-renders
- Native support for window scrolling with `useWindowScroll` prop

## Notes on Implementation

- Both implementations integrate with the main page scroll, loading more content as the user scrolls
- The current scroll detection triggers when the user is about 1000px from the bottom of the page
- React Virtuoso provides better performance with larger datasets
- Both implementations use the same data hook (`useHotProfiles`)
- The loading and finished states are visible at the bottom of the gallery
