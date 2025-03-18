import React from "react";
import { Box, Typography } from "@mui/material";

const NotAllowed = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/images/not-allowed-img.jpg`}
        alt="Not Allowed"
        sx={{ width: 250, height: "auto" }}
      />
      <Typography variant="h2" sx={{fontSize: 48, fontWeight: "bold", color: "#d9534f", marginTop: 2 }}>
        Acceso no autorizado para su rol
      </Typography>
    </Box>
  );
};

export default NotAllowed;
