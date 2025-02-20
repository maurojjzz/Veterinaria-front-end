import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Input, ButtonSubmit } from "../../../Shared";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { usuarioSchema } from "../../../../Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { signUp } from "../../../../redux/auth/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Toast, ModalAlert } from "../../../Shared";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { error, pending } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setShowToast(true);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: joiResolver(usuarioSchema),
  });

  const actionSumbit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(signUp(data));
      setShowModal(true);
      reset();
    } catch (error) {
      console.error(error);
      setToastMessage("Error al crear usuario");
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
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
        width: "100%",
        marginTop: { xs: "80px", md: "0px" },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(actionSumbit)}
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          paddingBottom: "40px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "32px",
            paddingBottom: "40px",
          }}
        >
          Sign Up
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", m_sm: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
            width: "85%",
          }}
        >
          <Input
            labelText={`Nombre`}
            placeholder={`Lionel`}
            type={`text`}
            name={"nombre"}
            register={register}
            error={errors.nombre?.message}
          />
          <Input
            labelText={`Apellido`}
            placeholder={`Messi`}
            type={`text`}
            name={"apellido"}
            register={register}
            error={errors.apellido?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", m_sm: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
            width: "85%",
          }}
        >
          <Input
            labelText={`Telefono`}
            placeholder={`1234567890`}
            type={`tel`}
            name={"telefono"}
            register={register}
            error={errors.telefono?.message}
          />
          <Input
            labelText={`Direccion`}
            placeholder={`Calle 123`}
            type={`text`}
            name={"direccion"}
            register={register}
            error={errors.direccion?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", m_sm: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
            width: "85%",
          }}
        >
          <Input
            labelText={`DNI`}
            placeholder={`12345678`}
            type={`number`}
            name={"nro_doc"}
            register={register}
            error={errors.nro_doc?.message}
          />
          <Input
            labelText={`Email`}
            placeholder={`lionel@messi.com`}
            type={`email`}
            name={"email"}
            register={register}
            error={errors.email?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", m_sm: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
            width: "85%",
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
      <ModalAlert
        text="¡Usuario creado con exito! Inicia sesion para continuar"
        clickAction={() => history.push("/auth/login")}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && (
        <Toast
          message={toastMessage}
          title={"Error"}
          setError={() => {
            setShowToast(false);
          }}
        />
      )}
    </Box>
  );
};

export default Form;
