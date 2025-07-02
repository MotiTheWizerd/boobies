import { Metadata } from "next";
import ImageUploaderDemo from "@/components/ImageUploader/Demo";

export const metadata: Metadata = {
  title: "Image Uploader Demo | bOObies.co.il",
  description:
    "Drag and drop image uploader with reordering, main image selection, and alt text editing",
};

export default function ImageUploaderDemoPage() {
  return <ImageUploaderDemo />;
}
