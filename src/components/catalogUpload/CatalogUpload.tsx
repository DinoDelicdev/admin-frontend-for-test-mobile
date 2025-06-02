import Button from "@mui/material/Button";
import { FormHelperText, Input, Switch } from "@mui/material";
import { FormControl } from "@mui/material";
import { useState } from "react";
import React from "react"; // Import React to use React.ChangeEvent
import ImageUpload from "../imageUpload/ImageUpload";

const CatalogUpload = () => {
  const [catalogTitle, setCatalogTitle] = useState("");
  const [numOfPages, setNumOfPages] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasSlider, setHasSlider] = useState(false);

  const handleSettingCatalogTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCatalogTitle(e.target.value);
  };

  const handleSettingNumOfPages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfPages(parseInt(e.target.value) || 0);
    console.log(numOfPages);
  };

  const handleSettingStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value ? new Date(e.target.value) : null);
    console.log(startDate);
  };

  const handleSettingEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value ? new Date(e.target.value) : null);
    console.log(endDate);
  };

  const handleSettingHasSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSlider(e.target.checked);
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
        // backgroundColor: "blue",
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
        <Button
          variant="contained"
          color="success"
          className="px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          POTVRDI UNOS
        </Button>
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
        <ImageUpload
          pageTitle="slider"
          catalogTitle={catalogTitle}
        ></ImageUpload>
        <ImageUpload
          pageTitle="thumbnail"
          catalogTitle={catalogTitle}
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogUpload;
