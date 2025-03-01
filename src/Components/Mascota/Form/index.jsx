import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, ButtonSubmit, Toast, ModalAlert } from "../../Shared";
import styles from "./form-mascota.module.css";
import { mascotaSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addMascota, updateMascota } from "../../../redux/mascotas/thunks.js";
import { Box, Typography } from "@mui/material";
import { justFecha } from "../../../Functions/utiities.js";
import SelectUser from "./SelectUser/SelectUser";
import SelectRaza from "./SelectRaza/SelectRaza.jsx";
import SexoRadioGroup from "./SelectSexo/SelectSexo.jsx";

const MascotasForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [especieElegida, setEspecieElegida] = useState({});
  const [razaElegida, setRazaElegida] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const dataForm = location.state?.params;

  const { pending, error } = useSelector((state) => state.veterinarios);
  const { users } = useSelector((state) => state.users);

  const mascotaDataUpdate = {
    fecha_nacimiento: dataForm?.fecha_nacimiento,
    nombre: dataForm?.nombre,
    owner: dataForm?.owner,
    raza: dataForm?.raza,
    sexo: dataForm?.sexo,
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(mascotaSchema),
    defaultValues: {
      ...mascotaDataUpdate,
    },
  });

  const handleEspecieChange = (especie) => {
    setEspecieElegida(especie);
  };

  const handleRazaChange = (raza) => {
    setRazaElegida(raza);
    setValue("raza", raza.id);
  };

  useEffect(() => {
    if (!pending && error) {
      setToastMessage(error);
      setToastType("Error");
      setShowToast(true);
    }
  }, [error, pending]);

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/admin/mascota", { state: { message, type } });
    }, 2000);
  };

  const mascotaAdd = async (data) => {
    try {
      await dispatch(addMascota(data));
      goBackToTable("Mascota creada exitosamente");
    } catch (error) {
      console.error("Error al crear mascota", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const mascotaUpdate = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(updateMascota(data));
      goBackToTable("Mascota actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar mascota", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = async (data) => {
    if (id) {
      data.id = id;
    }
    const userElegido = await users.find((user) => user.email === data.owner);
    const dateFormated = await justFecha(data.fecha_nacimiento);
    data = { ...data, raza: razaElegida.id, owner: userElegido.id, fecha_nacimiento: dateFormated };
    setFormData(data);
    setShowModal(true);
  };

  const confirmAction = () => {
    setIsLoading(true);
    setShowModal(false);
    if (!id) {
      mascotaAdd(formData);
    } else {
      mascotaUpdate(formData);
    }
  };

  return (
    <div
      className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 ${styles.container}`}
    >
      <form
        className={`container d-flex flex-column align-items-center p-4  rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" pb={4}>
          Mascota
        </Typography>

        <Box
          sx={{
            minWidth: "180px",
            maxWidth: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "23px",
          }}
        >
          <SelectRaza
            register={register}
            errorEspecie={errors.especie?.message}
            errorRaza={errors.raza?.message}
            onChangeEspecie={handleEspecieChange}
            onChangeRaza={handleRazaChange}
          />
        </Box>

        <Box
          sx={{
            minWidth: "180px",
            maxWidth: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SexoRadioGroup 
            register={register} 
            error={errors.sexo?.message} 
          />
          <Input
            labelText={`Nombre`}
            placeholder={`Lola`}
            type={`text`}
            name={"nombre"}
            register={register}
            error={errors.nombre?.message}
          />
        </Box>

        <Box
          sx={{
            minWidth: "180px",
            maxWidth: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "40px",
          }}
        >
          <Input
            labelText={`Fecha Nacimiento`}
            type={`date`}
            name={"fecha_nacimiento"}
            register={register}
            error={errors.fecha_nacimiento?.message}
          />

          <SelectUser
            labelText={`Dueño`}
            placeholder={`Seleccione el dueño`}
            name={"owner"}
            error={errors.owner?.message}
            register={register}
          />
        </Box>

        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ENVIAR`}
          clickAction={() => {}}
          type={`submit`}
          disabled={isLoading}
        />
      </form>
      <ModalAlert
        text={id ? "¿Desea actualizar la mascota?" : "¿Desea crear la mascota?"}
        clickAction={confirmAction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default MascotasForm;
