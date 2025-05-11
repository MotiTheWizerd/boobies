# Modal Component

A reusable modal component with backdrop blur effect for the Publish Board application.

## Features

- Customizable modal sizes (sm, md, lg, xl)
- Backdrop blur effect
- Close on Escape key
- Close on outside click
- Prevents body scrolling when open
- Fully accessible with proper ARIA attributes
- Optional title with close button
- Responsive design

## Usage

```tsx
import { useState } from "react";
import Modal from "@/app/components/Common/Modal";

export default function YourComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Your Modal Title"
        size="md" // options: "sm", "md", "lg", "xl" (default: "md")
      >
        <div>
          {/* Your modal content goes here */}
          <p>This is the modal content.</p>

          <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
```

## Props

| Prop            | Type                         | Default | Description                                     |
| --------------- | ---------------------------- | ------- | ----------------------------------------------- |
| isOpen          | boolean                      | -       | Controls whether the modal is visible           |
| onClose         | () => void                   | -       | Function called when the modal should close     |
| title           | string                       | -       | Optional title displayed at the top of modal    |
| children        | React.ReactNode              | -       | Content to display inside the modal             |
| size            | "sm" \| "md" \| "lg" \| "xl" | "md"    | Controls the max-width of the modal             |
| hideCloseButton | boolean                      | false   | Whether to hide the default close button        |
| preventClose    | boolean                      | false   | Prevents closing on escape key or outside click |

## Example with Form

See the `demo.tsx` file for a complete example of using the Modal component with a form.

## Accessibility

The modal component is built with accessibility in mind:

- Proper ARIA attributes
- Focus management
- Keyboard navigation
- Screen reader support
