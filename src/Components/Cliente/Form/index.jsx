import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./form.module.css";
import { usuarioSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addUser as addUserThunk, updateUser as updateUserThunk } from "../../../redux/users/thunks.js";

const FormClient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dataForm = location.state?.params;

  const [isLoading, setIsLoading] = useState(false);

  const usuarioDataUpdate = {
    nombre: dataForm?.nombre,
    apellido: dataForm?.apellido,
    email: dataForm?.email,
    password: dataForm?.password,
    telefono: dataForm?.telefono,
    nro_doc: dataForm?.nro_doc,
    direccion: dataForm?.direccion,
    rol: dataForm?.rol || "65334d8d48ec52ff5e08c85a",
    mascotas: dataForm?.mascotas,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(usuarioSchema),
    defaultValues: {
      ...usuarioDataUpdate,
    },
  });

  const goBackToTable = () => {
    setTimeout(() => {
      history.push("/admin");
    }, 2000);
  };

  const addUser = async (data) => {
    try {
      await dispatch(addUserThunk(data));
      console.log("Se creó correctamente");
      goBackToTable();
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
      console.log("Se actualizó correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (!id) {
      addUser(data);
    } else {
      updateUser(data);
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

export default FormClient;
