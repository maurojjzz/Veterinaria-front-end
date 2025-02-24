import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Input, ButtonSubmit, ModalAlert } from "../../../Shared";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { usuarioSchema } from "../../../../Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../redux/users/thunks.js";

const Form = ({ dataForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

//   console.log(dataForm, "data forma")

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: joiResolver(usuarioSchema),
  });

  useEffect(() => {
    if (dataForm) {
      const usuarioDataUpdate = {
        nombre: dataForm?.nombre,
        apellido: dataForm?.apellido,
        email: dataForm?.email,
        telefono: dataForm?.telefono,
        nro_doc: dataForm?.nro_doc,
        direccion: dataForm?.direccion,
        rol: dataForm?.rol || process.env.REACT_APP_USER_TYPE_ID,
        mascotas: dataForm?.mascotas,
      };
      reset(usuarioDataUpdate);
    }
  }, [dataForm, reset]);

  const onSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const confirmAction = async () => {
    setIsLoading(true);
    console.log(formData, "OTROOOOO");
    const newData = { ...formData, id: dataForm.id };
    try {
      await dispatch(updateUser(newData));

    } catch (error) {

        console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setShowModal(false);
      }, 2000);

    }
  };

  return (
    <Box
      component={`form`}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid red",
        width: "100%",
        maxWidth: "900px",
        paddingBottom: "50px",
      }}
    >
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
          labelText={`Email`}
          placeholder={`lionel@messi.com`}
          type={`email`}
          name={"email"}
          register={register}
          error={errors.email?.message}
        />
        <Input
          labelText={`DNI`}
          placeholder={`12345678`}
          type={`number`}
          name={"nro_doc"}
          register={register}
          error={errors.nro_doc?.message}
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
      <ButtonSubmit type={"submit"} msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ACTUALIZAR`} />
      <ModalAlert
        text={"Usted va a actualizar los datos de su cuenta"}
        clickAction={confirmAction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default Form;
