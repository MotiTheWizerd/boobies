import { Metadata } from "next";
import { ImageUploaderFormExample } from "@/components/ImageUploader/FormExample";

export const metadata: Metadata = {
  title: "Image Uploader Form Example | bOObies.co.il",
  description:
    "Form with drag and drop image uploader for creating new listings with multiple images",
};

export default function ImageUploaderFormPage() {
  return <ImageUploaderFormExample />;
}
