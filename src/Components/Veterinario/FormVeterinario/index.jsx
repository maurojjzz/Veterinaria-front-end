import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, ButtonSubmit, Toast, ModalAlert } from "../../Shared";
import styles from "./formVeterinario.module.css";
import { veterinarioSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addVet, updateVet } from "../../../redux/veterinarios/thunks.js";
import Typography from "@mui/material/Typography";

const FormVeterinario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const dataForm = location.state?.params;

  const { pending, error } = useSelector((state) => state.veterinarios);

  const veterinarioDataUpdate = {
    matricula: dataForm?.matricula,
    nombre: dataForm?.nombre,
    apellido: dataForm?.apellido,
    telefono: dataForm?.telefono,
    email: dataForm?.email,
    nro_doc: dataForm?.nro_doc,
    rol: dataForm?.rol || process.env.REACT_APP_USER_TYPE_ID,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(veterinarioSchema),
    defaultValues: {
      ...veterinarioDataUpdate,
    },
  });

  useEffect(() => {
    if (!pending && error) {
      setToastMessage(error);
      setToastType("Error");
      setShowToast(true);
    }
  }, [error, pending]);

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/admin/veterinarios", { state: { message, type } });
    }, 2000);
  };

  const addVeterinario = async (data) => {
    try {
      await dispatch(addVet(data));
      goBackToTable("Veterinario creado exitosamente");
    } catch (error) {
      console.error("Error al crear veterinario", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updateVeterinario = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(updateVet(data));
      goBackToTable("Veterinario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar veterinario", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    if (id) {
      data.id = id;
    }
    setFormData(data);
    setShowModal(true);
  };

  const confirmAction = () => {
    setIsLoading(true);
    setShowModal(false);
    if (!id) {
      addVeterinario(formData);
    } else {
      updateVeterinario(formData);
    }
  };


  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center p-4  rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" pb={4}>
          Veterinario
        </Typography>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Matrícula`}
            placeholder={`123456`}
            type={`text`}
            name={"matricula"}
            register={register}
            error={errors.matricula?.message}
          />
          <Input
            labelText={`Nombre`}
            placeholder={`Nombre`}
            type={`text`}
            name={"nombre"}
            register={register}
            error={errors.nombre?.message}
          />
        </div>

        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Apellido`}
            placeholder={`Apellido`}
            type={`text`}
            name={"apellido"}
            register={register}
            error={errors.apellido?.message}
          />
          <Input
            labelText={`Teléfono`}
            placeholder={`Teléfono`}
            type={`text`}
            name={"telefono"}
            register={register}
            error={errors.telefono?.message}
          />
        </div>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Email`}
            placeholder={`Email`}
            type={`email`}
            name={"email"}
            register={register}
            error={errors.email?.message}
          />
          <Input
            labelText={`Nro Documento`}
            placeholder={`Nro Documento`}
            type={`text`}
            name={"nro_doc"}
            register={register}
            error={errors.nro_doc?.message}
          />
        </div>
        {!dataForm?.email && (
          <div
            className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
          >
            <Input
              labelText={`Contraseña`}
              placeholder={`Contraseña`}
              type={`password`}
              name={"password"}
              register={register}
              error={errors.password?.message}
            />
            <Input
              labelText={`Repetir Contraseña`}
              placeholder={`Repetir Contraseña`}
              type={`password`}
              name={`repeatPassword`}
              register={register}
              error={errors.repeatPassword?.message}
            />
          </div>
        )}
        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ENVIAR`}
          clickAction={() => {}}
          type={`submit`}
          disabled={isLoading}
        />
      </form>
      <ModalAlert
        text={id ? "¿Desea actualizar al veterinario?" : "¿Desea crear veterinario?"}
        clickAction={confirmAction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default FormVeterinario;
