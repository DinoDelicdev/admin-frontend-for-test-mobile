import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Box,
  Chip,
  Typography,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import TestImageUpload from "../testImageUpload/TestImageUpload"; // Assuming this component exists

type LastEditedField = "original" | "discountPrice" | "discountPercent" | null;

const ArticleUpload = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");

  const [originalPrice, setOriginalPrice] = useState<number | string>(0);
  const [discountPrice, setDiscountPrice] = useState<number | string>(0);
  const [discountPercent, setDiscountPercent] = useState<number | string>(0);

  const [articleAmount, setArticleAmount] = useState(0);
  const [measurmentUnit, setMeasurmentUnit] = useState("kom");

  const [lastEdited, setLastEdited] = useState<LastEditedField>(null);

  const [newVariantText, setNewVariantText] = useState("");
  const [articleVariations, setArticleVariations] = useState<string[]>([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  useEffect(() => {
    const numOriginal = parseFloat(String(originalPrice)) || 0;
    const numDiscount = parseFloat(String(discountPrice)) || 0;
    const numPercent = parseFloat(String(discountPercent)) || 0;

    if (!lastEdited) return;

    switch (lastEdited) {
      case "original":
        // Kad promijenimo originalnu cijenu, ona postaje kao neki anker za dalje promjene
        const newDiscountPrice = numOriginal * (1 - numPercent / 100);
        setDiscountPrice(parseFloat(newDiscountPrice.toFixed(2)));
        break;

      case "discountPrice":
        if (
          numOriginal === 0 ||
          (numPercent === 0 && numDiscount >= numOriginal)
        ) {
          // Ako nije unesena originalna cijena ili ako je diskontna cijena manja od originalne cijene
          setOriginalPrice(numDiscount);
          setDiscountPercent(0);
        } else {
          const safeDiscountPrice = Math.min(numOriginal, numDiscount);
          const newPercent = 100 * (1 - safeDiscountPrice / numOriginal);
          setDiscountPercent(parseFloat(newPercent.toFixed(2)));

          if (safeDiscountPrice !== numDiscount) {
            setDiscountPrice(safeDiscountPrice);
          }
        }
        break;

      case "discountPercent":
        if (numOriginal > 0) {
          const newDiscountPrice = numOriginal * (1 - numPercent / 100);
          setDiscountPrice(parseFloat(newDiscountPrice.toFixed(2)));
        }
        break;

      default:
        break;
    }
  }, [originalPrice, discountPrice, discountPercent, lastEdited]);

  // Handleri za Glavne inpute
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

  //HANDLERI ZA CIJENE I POPUST ---
  const handleOriginalPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLastEdited("original");
    setOriginalPrice(e.target.value);
  };

  const handleDiscountPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLastEdited("discountPrice");
    setDiscountPrice(e.target.value);
  };

  const handleDiscountPercentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLastEdited("discountPercent");
    setDiscountPercent(e.target.value);
  };

  //HANDLERI ZA KOLICINE ---

  const handleArticleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArticleAmount(Number(e.target.value));
  };

  const handleMeasurmentUnitChange = (
    e: SelectChangeEvent<string>
  ) => {
    setMeasurmentUnit(e.target.value);
  };

  //  Handleri za varijante
  const handleNewVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVariantText(e.target.value);
  };

  const handleAddVariant = () => {
    if (newVariantText.trim() === "") return;
    setArticleVariations([...articleVariations, newVariantText.trim()]);
    setNewVariantText("");
    setIsAddingVariant(false);
  };

  const handleVariantInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddVariant();
    }
  };

  const handleDeleteVariant = (variantToDelete: string) => {
    setArticleVariations(
      articleVariations.filter((variant) => variant !== variantToDelete)
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          p: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          Detalji
        </Typography>

        <FormControl fullWidth>
          <FormHelperText sx={{ m: "0 0 8px 0" }}>
            Unesi naziv proizvoda
          </FormHelperText>
          <Input
            type="text"
            id="naziv_artikla"
            required
            onChange={handleSettingArticleTitle}
            value={articleTitle}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormHelperText sx={{ m: "0 0 8px 0" }}>
            Unesi naziv proizvođača
          </FormHelperText>
          <Input
            type="text"
            id="naziv_proizvodjaca"
            required
            onChange={handleSettingManufacturerName}
            value={manufacturerName}
          />
        </FormControl>

        <div style={{ width: "100%", display: "flex", gap: "2rem" }}>
          <FormControl style={{ width: "30%" }}>
            <FormHelperText sx={{ m: "0 0 8px 0" }}>
              Originalna Cijena
            </FormHelperText>
            <Input
              type="number"
              onChange={handleOriginalPriceChange}
              value={originalPrice}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </FormControl>

          <FormControl style={{ width: "30%" }}>
            <FormHelperText sx={{ m: "0 0 8px 0" }}>
              Diskontna Cijena
            </FormHelperText>
            <Input
              type="number"
              onChange={handleDiscountPriceChange}
              value={discountPrice}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </FormControl>

          <FormControl style={{ width: "30%" }}>
            <FormHelperText sx={{ m: "0 0 8px 0" }}>Popust u %</FormHelperText>
            <Input
              type="number"
              onChange={handleDiscountPercentChange}
              value={discountPercent}
              inputProps={{ min: 0, max: 100 }}
            />
          </FormControl>
        </div>

        <div style={{ width: "100%", display: "flex", gap: "2rem" }}>
          <FormControl style={{ width: "60%" }}>
            <FormHelperText sx={{ m: "0 0 8px 0" }}>Kolicina</FormHelperText>
            <Input
              type="number"
              onChange={handleArticleAmountChange}
              // value={articleAmount}
              inputProps={{ min: 0 }}
            />
          </FormControl>

          <FormControl size="small" style={{ width: "30%" }}>
            <FormHelperText sx={{ m: "0 0 8px 0" }}>
              Mjerna Jedinica
            </FormHelperText>
            <Select value={measurmentUnit} onChange={handleMeasurmentUnitChange}>
              <MenuItem value={"kom"}>komad</MenuItem>
              <MenuItem value={"g"}>g</MenuItem>
              <MenuItem value={"kg"}>kg</MenuItem>
              <MenuItem value={"l"}>l</MenuItem>
              <MenuItem value={"ml"}>ml</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div></div>

        {/* --- VARIATIONS SECTION --- */}
        <Box>
          {/* <Typography variant="h6" component="h3" gutterBottom>
            Varijante Proizvoda
          </Typography> */}

          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", mb: 2 }}>
            {articleVariations.map((variant, index) => (
              <Chip
                key={index}
                label={variant}
                onDelete={() => handleDeleteVariant(variant)}
                color="primary"
              />
            ))}
          </Box>

          {isAddingVariant ? (
            <FormControl>
              <FormHelperText sx={{ m: "0 0 8px 0" }}>
                Dodaj Varijantu (pritisni Enter za dodavanje)
              </FormHelperText>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Input
                  type="text"
                  id="nova_varijanta"
                  autoFocus // Automatically focus the input when it appears
                  onChange={handleNewVariantChange}
                  onKeyPress={handleVariantInputKeyPress}
                  value={newVariantText}
                />
                <Button variant="contained" onClick={handleAddVariant}>
                  +
                </Button>
              </Box>
            </FormControl>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setIsAddingVariant(true);
              }}
            >
              Dodaj Varijantu
            </Button>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          p: { xs: 2, md: "30px" },
        }}
      >
        <TestImageUpload />
      </Box>
    </Box>
  );
};

export default ArticleUpload;
