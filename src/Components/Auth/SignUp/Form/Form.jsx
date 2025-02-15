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
        // justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "32px",
        }}
      >
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => console.log(data))}
        sx={{
          border: "1px solid red",
          width: "100%",
          flexGrow: 1,
        }}
      >
        <Box>
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
        <Box>
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
        <Box>
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
        <Box>
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
