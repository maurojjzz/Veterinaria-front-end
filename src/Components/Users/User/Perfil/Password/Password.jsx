import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Input, ModalAlert, ButtonSubmit } from "../../../../Shared";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { passwordSchema } from "../../../../../Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../../redux/users/thunks.js";

const Password = ({ setPassword, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataForm, setDataForm] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(passwordSchema),
  });

  const onSubmit = (data) => {
    setDataForm(data);
    setShowModal(true);
  };

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/user/perfil", { state: { message, type } });
    }, 2000);
  };

  const confirmAction = async () => {
    setIsLoading(true);
    const newData = { ...dataForm, id: id };
    try {
      await dispatch(updateUser(newData));
      goBackToTable("Contraseña actualizada correctamente");
    } catch (error) {
      console.log(error);
      goBackToTable("Error al actualizar contraseña", "Error");
    } finally {
      setShowModal(false);
      setTimeout(() => {
        setIsLoading(false);
        setPassword(false);
      }, 2000);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: "75px",
        left: "0",
        height: "calc(100vh - 75px)",
        backgroundColor: "rgba(0, 0, 0, 0.46)",
        zIndex: "5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          minWidth: "250px",
          height: "600px",
          backgroundColor: "white",
          borderRadius: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => {
            setPassword(false);
          }}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <CloseIcon fontSize="large" color="primary" />
        </IconButton>

        <Typography variant="h4" textAlign={"center"} mb={7}>
          Nueva contraseña
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Input
              labelText={`Contraseña`}
              placeholder={`**********`}
              type={`password`}
              name={"password"}
              register={register}
              error={errors.password?.message}
            />
            <Input
              labelText={`Confirmar contraseña`}
              placeholder={`**********`}
              type={`password`}
              name={"repeatPassword"}
              register={register}
              error={errors.repeatPassword?.message}
            />
          </Box>
          <ButtonSubmit type={"submit"} msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `CREAR CUENTA`} />
        </Box>
      </Box>
      <ModalAlert
        text={"Usted va actualizar su contraseña"}
        clickAction={confirmAction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default Password;
