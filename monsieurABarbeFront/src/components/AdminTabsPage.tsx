"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import ProductManagement from "@/app/admin/ProductManagement";
import OrdersManagement from "@/app/admin/OrderManagement";

export default function AdminTabsPage() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh", marginTop: "3em", color: "black" }}>
      {/* Onglets en vertical */}
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleChange}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "black" } }}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minWidth: "200px",
          height: "100%",
          "& .MuiTab-root": {
            color: "black",
            alignItems: "flex-start",
            paddingLeft: "1em",
          },
        }}
      >
        <Tab label="Produits" />
        <Tab label="Commandes" />
      </Tabs>

      {/* Contenu à droite */}
      <Box sx={{ flexGrow: 1, p: 3, color: "black" }}>
        {tab === 0 && <ProductManagement />}
        {tab === 1 && <OrdersManagement />}
      </Box>
    </Box>
  );
}
