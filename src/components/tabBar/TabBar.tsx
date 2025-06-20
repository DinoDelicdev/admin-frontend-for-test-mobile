import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ImageUpload from "../imageUpload/ImageUpload";
import CatalogUpload from "../catalogUpload/CatalogUpload";
import TestImageUpload from "../testImageUpload/TestImageUpload";
import ArticleUpload from "../articleUpload/ArticleUpload";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            // display: "flex",
            // justifyContent: "center",
          }}
          centered
        >
          <Tab
            sx={{  fontWeight: 900 }}
            label="DODAJ KATALOG"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontWeight: 900 }}
            label="DODAJ ARTIKAL"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ fontWeight: 900 }}
            label="Item Three"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CatalogUpload />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ArticleUpload/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
