import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, ButtonSubmit, Toast, ModalAlert } from "../../Shared";
import styles from "./form.module.css";
import { usuarioSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addUser as addUserThunk, updateUser as updateUserThunk } from "../../../redux/users/thunks.js";
import Typography from "@mui/material/Typography";

const FormClient = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dataForm = location.state?.params;

  const [isLoading, setIsLoading] = useState(false);

  const { pending, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (!pending && error) {
      setToastMessage(error);
      setToastType("Error");
      setShowToast(true);
    }
  }, [error, pending]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(usuarioSchema),
    defaultValues: {
      ...usuarioDataUpdate,
    },
  });

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/admin/usuarios", { state: { message, type } });
    }, 2000);
  };

  const addUser = async (data) => {
    try {
      await dispatch(addUserThunk(data));
      goBackToTable("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error al crear usuario", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updateUser = async (data) => {
    try {
      data.mascotas = Array.from(new Set(data.mascotas.map((mascota) => mascota.id)));
      data.id = id;
      await dispatch(updateUserThunk(data));
      goBackToTable("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const confirmAction = () => {
    setIsLoading(true);
    setShowModal(false);
    if (!id) {
      addUser(formData);
    } else {
      updateUser(formData);
    }
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center pb-4 rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
          Usuarios
        </Typography>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
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
        </div>

        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Email`}
            placeholder={`liomessigamer@gmail.com`}
            type={`email`}
            name={"email"}
            register={register}
            error={errors.email?.message}
          />
          <Input
            labelText={`Direccion`}
            placeholder={`Alberdi 4250`}
            type={`text`}
            name={"direccion"}
            register={register}
            error={errors.direccion?.message}
          />
        </div>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Nro Documento`}
            placeholder={`42168754`}
            type={`text`}
            name={"nro_doc"}
            register={register}
            error={errors.nro_doc?.message}
          />
          <Input
            labelText={`Telefono`}
            placeholder={`+54 3416598754`}
            type={`text`}
            name={"telefono"}
            register={register}
            error={errors.telefono?.message}
          />
        </div>
        {!dataForm?.email && (
          <div
            className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
          >
            <Input
              labelText={`Contraseña`}
              placeholder={`Contraseña123`}
              type={`Password`}
              name={"password"}
              register={register}
              error={errors.password?.message}
            />
            <Input
              labelText="Repetir Contraseña"
              placeholder={`Contraseña123`}
              type={`Password`}
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
        text={id ? "¿Desea actualizar al usuario?" : "¿Desea crear el usuario?"}
        clickAction={confirmAction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default FormClient;
