import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Fecha from "./Fecha/Fecha";
import Hora from "./Hora/Hora";
import SelectPet from "./SelectPet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ButtonSubmit, Toast } from "../../../Shared";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { turnoSchema } from "../../../../Validations";
import { formateoFecha } from "../../../../Functions/utiities.js";
import { useDispatch } from "react-redux";
import { addAtencion } from "../../../../redux/atenciones/thunks.js";

const Turno = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(turnoSchema),
  });

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/user/historial-atenciones", { state: { message, type } });
    }, 2000);
  };

  const onSubmit = async (data) => {
    await setIsLoading(true);
    data = { ...data, fecha_hora_atencion: formateoFecha(data?.fecha, data?.hora) };
    try {
      await dispatch(addAtencion(data));
      goBackToTable("Se agendó correctamente el turno");
    } catch (error) {
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "75px",
        height: "calc(100vh - 75px)",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          py: "20px",
          border: "1px solid rgba(95, 92, 92, 0.32)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "5px",
          boxShadow: "5px 3px 10px 1px rgba(0, 2, 2, 0.47)",
          minHeight: "500px",
          width: "90%",
          maxWidth: "700px",
          minWidth: "250px",
          mb: "30px",
        }}
      >
        <Typography variant="h3" mb={5}>
          Turno
        </Typography>
        <Fecha
          labelText={`Fecha Atencion`}
          placeholder={`25/05/2022`}
          type={`date`}
          name={"fecha"}
          register={register}
          error={errors?.fecha?.message}
        />
        <Hora
          labelText={`Hora`}
          placeholder={`10:00`}
          name={"hora"}
          error={errors?.hora?.message}
          register={register}
        />

        <SelectPet register={register} name={`mascota`} error={errors?.mascota?.message} />

        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ENVIAR`}
          clickAction={() => {}}
          type={`submit`}
          disabled={isLoading}
        />
      </Box>
      {showToast && <Toast title={"Error"} message={"Hubo un error al crear el turno. Intente mas tarde nuevamente"} setError={setShowToast} />}
    </Box>
  );
};

export default Turno;
