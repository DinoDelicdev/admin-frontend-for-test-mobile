import Button from "@mui/material/Button";
import { FormHelperText, Input, Switch } from "@mui/material";
import { FormControl } from "@mui/material";
import { useState } from "react";
import React from "react";
import ImageUpload from "../imageUpload/ImageUpload";

interface ImageUploadData {
  file: File;
  pageTitle: string;
}

const CatalogUpload = () => {
  const [catalogTitle, setCatalogTitle] = useState("");
  const [numOfPages, setNumOfPages] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasSlider, setHasSlider] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ImageUploadData[]>([]);
  const [resetImageUploads, setResetImageUploads] = useState(0);

  const handleSettingCatalogTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCatalogTitle(e.target.value);
  };

  const handleSettingNumOfPages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumOfPages(value);
    // Clear uploadedImages when number of pages changes to avoid stale data
    setUploadedImages([]);
  };

  const handleSettingStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value ? new Date(e.target.value) : null);
  };

  const handleSettingEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value ? new Date(e.target.value) : null);
  };

  const handleSettingHasSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSlider(e.target.checked);
  };

  const handleImageSelected = (file: File | null, pageTitle: string) => {
    setUploadedImages((prevImages) => {
      const filtered = prevImages.filter((img) => img.pageTitle !== pageTitle);
      if (file) {
        return [...filtered, { file, pageTitle }];
      }
      return filtered;
    });
  };

  // const handleCatalogInfoSend = async () => {
  //   const info = {
  //     title: catalogTitle,
  //     start_date: startDate?.toDateString(),
  //     endDate: endDate?.toDateString(),
  //   };
  //   console.log("Catalog Info:", info);
  // };

  const handleSendAllImages = async () => {
    if (!catalogTitle) {
      alert("Molimo unesite naziv kataloga prije slanja slika.");
      return;
    }

    if (uploadedImages.length === 0) {
      alert("Molimo odaberite barem jednu sliku za slanje.");
      return;
    }

    let allUploadsSuccessful = true;

    console.log(uploadedImages);

    for (const imageData of uploadedImages) {
      const formData = new FormData();
      formData.append("image", imageData.file);
      formData.append(
        "customFileName",
        `${catalogTitle
          .toLowerCase()
          .split(" ")
          .join("_")}_${imageData.pageTitle.toLowerCase().split(" ").join("_")}`
      );

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          allUploadsSuccessful = false;
          console.error(`Failed to upload image for ${imageData.pageTitle}`);
        }
      } catch (error) {
        allUploadsSuccessful = false;
        console.error(
          `Error uploading image for ${imageData.pageTitle}:`,
          error
        );
      }

      const catalogData = {
        title: catalogTitle,
        start_date: startDate?.toDateString(),
        end_date: endDate?.toDateString(),
        pages: uploadedImages.map((i) => {
          return `${catalogTitle
            .toLowerCase()
            .split(" ")
            .join("_")}_${i.pageTitle.toLowerCase().split(" ").join("_")}`;
        }),
      };

      console.log(catalogData);

      try {
        const response = await fetch("http://localhost:5000/upload-catalog-data", {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
          },
          body: JSON.stringify(catalogData),
        });
        console.log(response.ok)
      } catch (err) {

      }
    }

    if (allUploadsSuccessful) {
      alert("Sve slike su uspješno poslane!");
      setUploadedImages([]);
      setResetImageUploads((prev) => prev + 1);
    } else {
      alert("Došlo je do greške prilikom slanja nekih slika.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "90vw",
        justifySelf: "center",
        minHeight: "80vh",
        alignItems: "center",
        border: "2px solid black",
        borderRadius: "20px",
        paddingRight: "20px",
        paddingLeft: "20px",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "90vw",
          width: "100%",
          height: "10%",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControl style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="text"
              id="naziv_kataloga"
              required
              aria-describedby="catalog-title-helper-text"
              style={{ border: "2px solid black", borderRadius: "5px" }}
              onChange={handleSettingCatalogTitle}
              value={catalogTitle}
            />
            <FormHelperText id="catalog-title-helper-text">
              Unesi naziv kataloga
            </FormHelperText>
          </FormControl>

          <FormControl style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="number"
              id="broj_stranica_kataloga"
              aria-describedby="num-pages-helper-text"
              style={{ border: "2px solid black", borderRadius: "5px" }}
              onChange={handleSettingNumOfPages}
              value={numOfPages} // Make it a controlled component
            />
            <FormHelperText id="num-pages-helper-text">
              Unesi broj stranica kataloga
            </FormHelperText>
          </FormControl>

          <FormControl
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch onChange={handleSettingHasSlider} checked={hasSlider} />
            <FormHelperText id="num-pages-helper-text">
              Da li postoji slider?
            </FormHelperText>
          </FormControl>

          <FormControl style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="date"
              id="start_date_kataloga"
              aria-describedby="start-date-helper-text"
              style={{ border: "2px solid black" }}
              onChange={handleSettingStartDate}
              value={startDate ? startDate.toISOString().split("T")[0] : ""} // Format date for input value
            />
            <FormHelperText id="start-date-helper-text">
              Unesi datum pocetka trajanja kataloga
            </FormHelperText>
          </FormControl>

          <FormControl style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="date"
              id="end_date_kataloga"
              aria-describedby="end-date-helper-text"
              style={{ border: "2px solid black" }}
              onChange={handleSettingEndDate}
              value={endDate ? endDate.toISOString().split("T")[0] : ""} // Format date for input value
            />
            <FormHelperText id="end-date-helper-text">
              Unesi datum kraja trajanja kataloga
            </FormHelperText>
          </FormControl>
        </div>
        {/* <Button
          variant="contained"
          color="success"
          className="px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={handleCatalogInfoSend}
          style={{ marginTop: "20px" }}
        >
          POTVRDI UNOS
        </Button> */}
      </div>
      <h2>DODAJTE SLIDER I THUMBNAIL KATALOGA</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: "15px",
          height: "35%",
          overflowX: "auto",
          alignItems: "center",
          padding: "10px 0",
          width: "100%",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: "#9ca3af #e5e7eb",
        }}
      >
        {hasSlider ? (
          <ImageUpload
            pageTitle="slider"
            catalogTitle={catalogTitle}
            onImageSelected={handleImageSelected}
            resetTrigger={resetImageUploads}
          ></ImageUpload>
        ) : (
          ""
        )}
        <ImageUpload
          pageTitle="thumbnail"
          catalogTitle={catalogTitle}
          onImageSelected={handleImageSelected}
          resetTrigger={resetImageUploads}
        ></ImageUpload>
      </div>

      {/* Section for page uploads - now horizontally scrollable */}
      <h2>DODAJTE STRANICE KATALOGA</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
          gap: "15px",
          height: "35%",
          overflowX: "auto",
          alignItems: "center",
          padding: "10px 0",
          width: "100%",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: "#9ca3af #e5e7eb",
        }}
      >
        {Array.from({ length: numOfPages }, (_, i) => (
          <div
            key={i}
            style={{
              height: "100%",
              display: "flex",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageUpload
              pageTitle={`Stranica ${i + 1}`}
              catalogTitle={catalogTitle}
              onImageSelected={handleImageSelected}
              resetTrigger={resetImageUploads}
            />
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendAllImages}
        disabled={
          uploadedImages.length === 0 || !catalogTitle || !startDate || !endDate
        }
        style={{ marginBottom: "20px" }}
      >
        DODAJ KATALOG
      </Button>
    </div>
  );
};

export default CatalogUpload;
