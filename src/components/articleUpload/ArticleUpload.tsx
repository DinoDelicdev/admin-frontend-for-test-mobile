import React, { useState } from "react";
import TestImageUpload from "../testImageUpload/TestImageUpload";
import { FormControl, FormHelperText, Input } from "@mui/material";

const ArticleUpload = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");

  const handleSettingArticleTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArticleTitle(e.target.value);
  };

  const handleSettingManufacturerName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManufacturerName(e.target.value);
  };


  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100dvw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{
        width: "70%",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <FormControl style={{width: "70%"}}>
          <Input
            type="text"
            id="naziv_artikla"
            required
            aria-describedby="article-title-helper-text"
            style={{ border: "2px solid black", borderRadius: "5px" }}
            onChange={handleSettingArticleTitle}
            value={articleTitle}
          />
          <FormHelperText id="article-title-helper-text">
            Unesi naziv kataloga
          </FormHelperText>
        </FormControl>
        <FormControl style={{width: "70%"}}>
          <Input
            type="text"
            id="naziv_artikla"
            required
            aria-describedby="catalog-title-helper-text"
            style={{ border: "2px solid black", borderRadius: "5px" }}
            onChange={handleSettingManufacturerName}
            value={manufacturerName}
          />
          <FormHelperText id="catalog-title-helper-text">
            Unesi naziv proizvođača
          </FormHelperText>
        </FormControl>
        <FormControl style={{width: "70%"}}>
          <Input
            type="text"
            id="naziv_artikla"
            required
            aria-describedby="catalog-title-helper-text"
            style={{ border: "2px solid black", borderRadius: "5px" }}
            onChange={handleSettingManufacturerName}
            value={manufacturerName}
          />
          <FormHelperText id="catalog-title-helper-text">
            Unesi naziv proizvođača
          </FormHelperText>
        </FormControl>
      </div>

      <div style={{
        width: "30%",
        padding: "30px"
      }}>
        <TestImageUpload />
      </div>
    </div>
  );
};

export default ArticleUpload;
