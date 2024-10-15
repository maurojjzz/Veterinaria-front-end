import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./formVeterinario.module.css";
import { veterinarioSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addVet, updateVet } from "../../../redux/veterinarios/thunks.js";

const FormVeterinario = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const dataForm = location.state?.params;

  const veterinarioDataUpdate = {
    matricula: dataForm?.matricula,
    nombre: dataForm?.nombre,
    apellido: dataForm?.apellido,
    telefono: dataForm?.telefono,
    email: dataForm?.email,
    nro_doc: dataForm?.nro_doc,
    password: dataForm?.password,
    rol: dataForm?.rol || "65334db548ec52ff5e08c85b",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(veterinarioSchema),
    defaultValues: {
      ...veterinarioDataUpdate,
    },
  });

  const goBackToTable = () => {
    setTimeout(() => {
      history.push("/admin/veterinarios");
    }, 2000);
  };

  const addVeterinario = async (data) => {
    try {
      await dispatch(addVet(data));
      console.log("Se creó correctamente");
      goBackToTable();
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
      console.log("Se actualizó correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al actualizar veterinario", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (!id) {
      addVeterinario(data);
    } else {
      data.id = id;
      updateVeterinario(data);
    }
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center p-4 pt-5 rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ENVIAR`}
          clickAction={() => {}}
          type={`submit`}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default FormVeterinario;
