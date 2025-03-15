import { Box, Typography } from "@mui/material";
import Fecha from "./Fecha/Fecha";
import Hora from "./Hora/Hora";

const Turno = () => {
  return (
    <Box
      sx={{
        marginTop: "75px",
        border: "1px solid red",
        height: "calc(100vh - 75px)",
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" mt={2} mb={2}>
        Turno
      </Typography>
      <Box
        component={"form"}
        sx={{
          border: "1px solid red",
          height: "500px",
          width: "90%",
          maxWidth: "700px",
          minWidth: "250px",
          mb: "30px",
        }}
      >
        <Fecha />
        <Hora
          labelText={`Hora`}
          placeholder={`10:00`}
          type={`time`}
          name={"hora"}
          error={""}
        />
      </Box>
    </Box>
  );
};

export default Turno;
