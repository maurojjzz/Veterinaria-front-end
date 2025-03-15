import { Box, Typography } from "@mui/material";
import Fecha from "./Fecha/Fecha";
import Hora from "./Hora/Hora";
import SelectPet from "./SelectPet";

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
          minHeight: "500px",
          width: "90%",
          maxWidth: "700px",
          minWidth: "250px",
          mb: "30px",
        }}
      >
        <Fecha
          labelText={`Fecha Atencion`}
          placeholder={`25/05/2022`}
          type={`date`}
          name={"fecha"}
          // register={register}
          // error={errors.fecha?.message}
        />
        <Hora 
          labelText={`Hora`} 
          placeholder={`10:00`} 
          type={`time`} 
          name={"hora"} 
          error={"Hora requerida"}
        />

        <SelectPet
          // mascotas={userPet.mascotas}
          error={""}
          // register={register}
          // name={`mascota`}
          // defaultValue={atencionDataUpdate.mascota}
        />
      </Box>
    </Box>
  );
};

export default Turno;
