import { Button } from "@mui/material";
import React, { useState } from "react";

interface ImageUploadType {
  pageTitle: string;
  catalogTitle: string;
}

const ImageUpload: React.FC<ImageUploadType> = ({
  pageTitle,
  catalogTitle,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("Prevucite vasu sliku ovdje");
  const [success, setSuccess] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
    } else {
      setMessage("No file dropped.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
    }
  };

  const handleSend = async () => {
    if (!selectedFile) {
      setMessage("Morate prvo izabrati fotografiju");
      return;
    }

    if (!catalogTitle) {
      setMessage("Prvo dodjelite naziv katalogu");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("customFileName", `${catalogTitle}_${pageTitle}`);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Uspjesno ste uploadovali fotografiju " + pageTitle);
        setSelectedFile(null);
        setPreview(null);
        setSuccess(true);
      } else {
        setMessage("Failed to upload image.");
      }
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  return (
    <div
      style={{
        // backgroundColor: "yellow",
        height: "100%",
        minHeight: "375px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        gap: "5px",
      }}
    >
      <div
        style={{
          // backgroundColor: "lightgray",
          width: "100%",
          maxWidth: "200px",
          height: "90%",
          minHeight: "328px",
          // maxHeight: "340px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px dashed black",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: success ? "green" : "transparent",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {success ? <p>Promjeni {pageTitle}</p> : <p>Dodaj {pageTitle}</p>}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            color: "transparent",
            // backgroundColor: "green",
            width: "90%",
          }}

          // style={{ marginBottom: "10px" }}
        />
        {preview && (
          <div
            style={{
              marginBottom: "10px",
              height: "120px",
              width: "100%",
              // backgroundColor: "purple",
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
      <Button
        disabled={!selectedFile}
        onClick={handleSend}
        // style={{
        //   padding: "10px 20px",
        //   backgroundColor: "blue",
        //   color: "white",
        //   border: "none",
        //   cursor: "pointer",
        //   width: "90%",
        //   alignSelf: "center",
        // }}
        variant="contained"
      >
        Send
      </Button>
    </div>
  );
};

export default ImageUpload;
