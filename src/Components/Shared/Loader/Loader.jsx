import { Box, Typography } from "@mui/material";
import Hamster from "./Hamster/Hamster.jsx";
import PointsLoader from "./Points/Points.jsx";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        height: "100vh",
        backgroundColor: "rgb(117, 117, 117)",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 10000,
      }}
    >
      <Hamster />
      <PointsLoader />
      <Typography variant="h3" sx={{ color: "white", fontweight: "bold", textTransform: "uppercase", textAlign: "center" }}>
        Cargando ...
      </Typography>
    </Box>
  );
};

export default Loader;
