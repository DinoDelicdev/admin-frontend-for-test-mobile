import React, { useState, useEffect } from "react";

interface ImageUploadType {
  pageTitle: string;
  catalogTitle: string;
  onImageSelected: (file: File | null, pageTitle: string) => void;
  resetTrigger?: number; // A prop to trigger reset from parent
}

const ImageUpload: React.FC<ImageUploadType> = ({
  pageTitle,
  onImageSelected,
  resetTrigger,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("Prevucite vasu sliku ovdje");

  // Effect to reset component when resetTrigger changes
  useEffect(() => {
    setSelectedFile(null);
    setPreview(null);
    setMessage("Prevucite vasu sliku ovdje");
  }, [resetTrigger]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
      onImageSelected(file, pageTitle); // Notify parent about the selected file
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
      onImageSelected(file, pageTitle); // Notify parent about the selected file
    } else {
      setMessage("No file dropped.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "375px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "200px",
          height: "90%",
          minHeight: "328px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px dashed black",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: selectedFile ? "#d4edda" : "transparent", // Light green when a file is selected
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>{selectedFile ? `Promjeni ${pageTitle}` : `Dodaj ${pageTitle}`}</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            color: "transparent",
            width: "90%",
          }}
        />
        {preview && (
          <div
            style={{
              marginBottom: "10px",
              height: "120px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "120px" }}
            />
          </div>
        )}

        {message && <p>{message}</p>}
      </div>
      {/* The send button is removed from here */}
    </div>
  );
};

export default ImageUpload;