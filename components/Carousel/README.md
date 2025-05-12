# Carousel Component

A fully reusable, accessible carousel component for Next.js applications.

## Features

- 🌐 RTL support
- 📱 Responsive design
- 🎨 Highly customizable
- ♿ Accessible with proper ARIA labels
- 🖱️ Interactive hover-to-reveal navigation
- 🔄 Smooth scrolling
- 📏 Customizable scroll amounts
- 🖼️ Faded edges effect
- 🧩 Generic typing support with TypeScript
- 🔄 Efficient rendering pattern

## Usage

```tsx
import Carousel from "../components/Carousel";

// Define your data type
interface Item {
  id: number;
  title: string;
  // other properties...
}

const MyPage = () => {
  // Your data array
  const items: Item[] = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
  ];

  // Render function
  const renderItem = (item: Item, index: number) => (
    <div className="my-item">
      <h3>{item.title}</h3>
      {/* Render content based on your item data */}
    </div>
  );

  return (
    <Carousel<Item>
      items={items}
      renderItem={renderItem}
      title="My Items"
      rtl={false}
      scrollAmount={400}
    />
  );
};
```

## Props

| Prop                      | Type                                  | Default                                   | Description                               |
| ------------------------- | ------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `items`                   | T[]                                   | Required                                  | Array of items to display in the carousel |
| `renderItem`              | (item: T, index: number) => ReactNode | Required                                  | Function to render each item              |
| `title`                   | string                                | undefined                                 | Optional title for the carousel           |
| `titleUnderline`          | boolean                               | true                                      | Whether to show underline on title        |
| `titleClassName`          | string                                | "text-2xl font-bold text-center relative" | Custom classes for the title              |
| `containerClassName`      | string                                | "py-10"                                   | Custom classes for the container          |
| `itemsContainerClassName` | string                                | "py-8 px-12"                              | Custom classes for the items container    |
| `scrollAmount`            | number                                | 300                                       | Pixels to scroll on arrow click           |
| `showArrows`              | boolean                               | true                                      | Whether to show navigation arrows         |
| `rtl`                     | boolean                               | false                                     | Right-to-left support                     |
| `fadedEdges`              | boolean                               | true                                      | Show faded edges on the carousel          |
| `gap`                     | string                                | "gap-8 md:gap-10"                         | Gap between items (Tailwind classes)      |
| `itemWrapperClassName`    | string                                | "flex-shrink-0 p-4"                       | Classes for the item wrapper div          |

## Examples

### Basic Example

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Product A", price: 19.99, image: "/images/product-a.jpg" },
  // more products...
];

<Carousel<Product>
  items={products}
  renderItem={(product) => <ProductCard product={product} />}
  title="Featured Products"
/>;
```

### RTL Example with Profile Data

```tsx
interface Profile {
  id: number;
  name: string;
  imageUrl: string;
  isHot?: boolean;
  isPremium?: boolean;
}

const profiles: Profile[] = [
  { id: 1, name: "סופיה", imageUrl: "/images/profile1.jpg", isHot: true },
  // more profiles...
];

<Carousel<Profile>
  items={profiles}
  renderItem={(profile, index) => (
    <ProfileCard
      name={profile.name}
      imageUrl={profile.imageUrl}
      isHot={profile.isHot}
      isPremium={profile.isPremium}
      delay={index}
    />
  )}
  title="סטורים היום"
  rtl={true}
/>;
```

### Custom Styling

```tsx
<Carousel<ImageItem>
  items={images}
  renderItem={(image) => <ImageGalleryItem src={image.url} alt={image.alt} />}
  title="My Collection"
  titleClassName="text-3xl font-bold text-blue-600 text-center"
  containerClassName="py-12 bg-gray-100 rounded-lg"
  itemsContainerClassName="py-6 px-8"
  gap="gap-6"
  fadedEdges={false}
  itemWrapperClassName="flex-shrink-0 w-64 h-48 p-2"
/>
```

## SEO Benefits

This carousel component is designed with SEO in mind:

- Semantic HTML structure
- Proper heading hierarchy with the title
- Accessible navigation with ARIA labels
- Content remains indexable by search engines
- Type-safe implementation with TypeScript generics
- Performance optimized with efficient rendering pattern
