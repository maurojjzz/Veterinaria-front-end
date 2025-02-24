import { Box, Typography, Fade } from "@mui/material";
import Hamster from "../Hamster/Hamster.jsx";
import { useState, useEffect } from "react";

const LoaderShort = ({ load }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!load) {
      setTimeout(() => setShow(false), 1000); 
    }
  }, [load]);

  return (
    show && (
      <Fade in={load} timeout={1000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(117, 117, 117, 0.75)",
            width: "100%",
            zIndex: 100,
            position: "absolute",
            top: 0,
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
              height: "500px",
              borderRadius: "10px",
              gap: "30px",
            }}
          >
            <Hamster />
            <Typography variant="h6">Cargando ...</Typography>
          </Box>
        </Box>
      </Fade>
    )
  );
};

export default LoaderShort;
