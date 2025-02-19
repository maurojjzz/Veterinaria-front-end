import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Input, ButtonSubmit } from "../../../Shared";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { usuarioSchema } from "../../../../Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Form = () => {

  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(usuarioSchema),
  });

  const actionSumbit = (data) => {
    //aca agrego el id de usuario para que tenga ese rol negri
    console.log(data);
    setIsLoading(true);
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

        <ButtonSubmit
          type={"submit"}
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `CREAR CUENTA`}
        />
      </Box>
    </Box>
  );
};

export default Form;
