import { Box, Typography } from "@mui/material";
import Celda from "./Celda.jsx";

const TablaMascota = ({ data, setData }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center",
        py: "40px",
        overflowY: "auto",
        borderRadius: "10px",
        border: "1px solid #1BBCB6",
      }}
    >
      {data.length > 0 ? (
        data.map((item, index) => <Celda key={index} item={item} />)
      ) : (
        <Typography variant="h5" sx={{ width: "100%", textAlign: "center", color: "#1BBCB6" }}>
          No hay mascotas registradas. Ingrese una.
        </Typography>
      )}
    </Box>
  );
};

export default TablaMascota;
