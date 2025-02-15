import { Box, Typography } from "@mui/material";
import { Input, ButtonSubmit } from "../../../Shared";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    // resolver: joiResolver(loginSchema),
  });

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
        onSubmit={handleSubmit((data) => console.log(data))}
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
            flexDirection: { xs: "column", md: "row" },
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
            name={"name"}
            register={register}
            // error={errors.email?.message}
          />
          <Input
            labelText={`Apellido`}
            placeholder={`Messi`}
            type={`text`}
            name={"surname"}
            register={register}
            // error={errors.email?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
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
            name={"phone"}
            register={register}
            // error={errors.email?.message}
          />
          <Input
            labelText={`Direccion`}
            placeholder={`Calle 123`}
            type={`text`}
            name={"address"}
            register={register}
            // error={errors.email?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
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
            name={"dni"}
            register={register}
            // error={errors.email?.message}
          />
          <Input
            labelText={`Email`}
            placeholder={`lionel@messi.com`}
            type={`email`}
            name={"email"}
            register={register}
            // error={errors.email?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
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
            // error={errors.email?.message}
          />
          <Input
            labelText={`Confirmar contraseña`}
            placeholder={`**********`}
            type={`password`}
            name={"confirmPassword"}
            register={register}
            // error={errors.email?.message}
          />
        </Box>

        <ButtonSubmit type={"submit"} msg={"CONFIRMAR CUENTA"} />
      </Box>
    </Box>
  );
};

export default Form;
