import React, { useCallback, useState } from "react";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DropzoneProps {
  field: {
    value: File | null;
    onChange: (file: File | null) => void;
    onBlur: () => void;
  };
  onFileChange?: (file: File | null) => void;
}

export default function Dropzone({ field, onFileChange }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      field.onChange(file);
      onFileChange?.(file);
    },
    [field, onFileChange]
  );

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFile(selectedFile);
      }
    },
    [handleFile]
  );

  const removeFile = () => {
    field.onChange(null);
    onFileChange?.(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto h-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 h-64  ${
          isDragging ? "border-primary" : "border-accent-foreground"
        } ${
          error ? "border-destructive" : ""
        } transition-colors duration-300 ease-in-out flex justify-center items-center`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          className="hidden"
          onChange={handleFileInput}
          id="fileInput"
        />
        {!field.value && (
          <Label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center h-full cursor-pointer"
          >
            <UploadIcon className="w-12 h-12 text-primary" />
            <p className="mt-2 text-sm text-accent-foreground">
              Arrastra un archivo o haz clic para seleccionar uno
            </p>
          </Label>
        )}
        {field.value && (
          <div className="flex items-center justify-between p-2 mt-2 bg-udea-500 rounded">
            <div className="flex items-center">
              <FileIcon className="w-6 h-6 mr-2 text-secondary-foreground" />
              <span className="text-sm font-medium text-secondary-foreground">
                {field.value.name}
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={removeFile}
              className="text-destructive-foreground bg-transparent hover:bg-transparent hover:text-red-500"
            >
              <XIcon className="w-6 h-6" />
            </Button>
          </div>
        )}
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
