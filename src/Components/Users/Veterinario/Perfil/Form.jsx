import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { Input, ButtonSubmit, ModalAlert } from "../../../Shared";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { veterinarioSchema } from "../../../../Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateVet } from "../../../../redux/veterinarios/thunks.js";

const Form = ({ dataForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

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
    resolver: joiResolver(veterinarioSchema),
  });


  useEffect(() => {
    if (dataForm) {
      const usuarioDataUpdate = {
        nombre: dataForm?.nombre,
        apellido: dataForm?.apellido,
        email: dataForm?.email,
        telefono: dataForm?.telefono,
        nro_doc: dataForm?.nro_doc,
        matricula: dataForm?.matricula,
        rol: dataForm?.rol || process.env.REACT_APP_VETE_TYPE_ID,
      };
      reset(usuarioDataUpdate);
    }
  }, [dataForm, reset]);


  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/vet/perfil", { state: { message, type } });
    }, 2000);
  };

  const onSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };


  const confirmAction = async () => {
    setIsLoading(true);
    const newData = { ...formData, id: dataForm.id };
    try {
      await dispatch(updateVet(newData));
      goBackToTable("Veterinario actualizado correctamente");
    } catch (error) {
      console.log(error);
      goBackToTable("Error al actualizar veterinario", "Error");
    } finally {
      setShowModal(false);
      setTimeout(() => {
        setIsLoading(false);
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
          labelText={`Matricula`}
          placeholder={`FF1235FF`}
          type={`text`}
          name={"matricula"}
          register={register}
          error={errors.matricula?.message}
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
