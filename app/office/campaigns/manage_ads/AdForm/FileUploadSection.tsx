import FileUpload from "@/components/Upload/FileUpload";

interface FileUploadSectionProps {
  files: File[];
  defaultFileName: string;
  onFilesChange: (files: File[]) => void;
  onSetDefaultFile: (file: File) => void;
}

export default function FileUploadSection({
  files,
  defaultFileName,
  onFilesChange,
  onSetDefaultFile,
}: FileUploadSectionProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        תמונות ווידאו
      </label>
      <FileUpload
        onFilesChange={onFilesChange}
        maxFiles={10}
        acceptedTypes={["image/*", "video/*"]}
        maxFileSize={50}
        files={files}
        className="w-full"
        onSetDefaultFile={onSetDefaultFile}
        defaultFileName={defaultFileName}
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        ניתן להעלות עד 10 קבצים (תמונות ווידאו) בגודל מקסימלי של 50MB כל אחד
      </p>
    </div>
  );
}
