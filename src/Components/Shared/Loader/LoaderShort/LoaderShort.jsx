import { Box, Typography } from "@mui/material";
import Hamster from "../Hamster/Hamster.jsx";

const LoaderShort = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(117, 117, 117, 0.6)",
        width: "100%",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          maxWidth: "450px",
          width: "90%",
          height: "300px",
          borderRadius: "10px",
          gap: "30px",
        }}
      >
        <Hamster />
        <Typography variant="h6">Cargando ...</Typography>
      </Box>
    </Box>
  );
};

export default LoaderShort;
