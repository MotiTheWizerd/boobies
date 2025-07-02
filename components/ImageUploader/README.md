# Image Uploader Component

A feature-rich image uploader component for Next.js applications with drag and drop capabilities, image reordering, main image selection, and other useful features.

## Features

- Drag and drop upload area
- Drag to reorder images
- Main image selection
- Alt text editing for SEO optimization
- Image preview with delete option
- Support for both grid and horizontal layouts
- Mobile responsive
- Dark mode compatible

## Installation

The component uses the following dependencies:

- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- react-icons/fi
- sonner (for toast notifications)

These should already be installed in your project.

## Basic Usage

```tsx
import { useState } from "react";
import { ImageUploader, ImageItem } from "@/components/ImageUploader";

const MyComponent = () => {
  const [images, setImages] = useState<ImageItem[]>([]);

  const handleImagesChange = (newImages: ImageItem[]) => {
    setImages(newImages);
  };

  // Optional: Handle file uploads to your backend
  const handleUpload = async (files: File[]): Promise<ImageItem[]> => {
    // Implement your upload logic here
    // Return an array of ImageItem objects
  };

  return (
    <ImageUploader
      images={images}
      onImagesChange={handleImagesChange}
      onUpload={handleUpload} // Optional
      maxImages={10}
      layout="grid" // or "horizontal"
      allowMainImage={true}
    />
  );
};
```

## Props

| Prop              | Type                                      | Default  | Description                                           |
| ----------------- | ----------------------------------------- | -------- | ----------------------------------------------------- |
| `images`          | `ImageItem[]`                             | `[]`     | Array of image items to display                       |
| `onImagesChange`  | `(images: ImageItem[]) => void`           | -        | Callback when images are added, removed, or reordered |
| `onUpload`        | `(files: File[]) => Promise<ImageItem[]>` | -        | Optional function to handle file uploads              |
| `maxImages`       | `number`                                  | `10`     | Maximum number of images allowed                      |
| `layout`          | `'grid' \| 'horizontal'`                  | `'grid'` | Layout style for displaying images                    |
| `allowReordering` | `boolean`                                 | `true`   | Allow drag and drop reordering                        |
| `allowMainImage`  | `boolean`                                 | `true`   | Allow setting a main image                            |

## ImageItem Interface

```tsx
interface ImageItem {
  id: string;
  url: string;
  altText: string;
  isMain?: boolean;
  file?: File; // Available for newly uploaded files
}
```

## Example Usage in a Form

See the `FormExample.tsx` component for a complete example of using the ImageUploader in a form.

## Demo

Visit `/image-uploader-demo` to see a basic demonstration of the component.

Visit `/image-uploader-form` to see the component integrated in a form.

## License

This component is part of the bOObies.co.il project.
