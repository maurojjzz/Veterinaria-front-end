import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./formVeterinario.module.css";
import { veterinarioSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";

const FormVeterinario = () => {
  const { id } = useParams();
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
      history.push("/veterinarios");
    }, 2000);
  };

  const addVeterinario = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/veterinarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Se creó correctamente");
        goBackToTable();
      } else {
        console.log("No se pudo crear el veterinario");
        console.error(await response.text());
      }
    } catch (error) {
      console.error("Error al crear veterinario", error);
    }
  };

  const updateVeterinario = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/veterinarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Se actualizó correctamente");
        goBackToTable();
      } else {
        console.log("No se pudo actualizar el veterinario");
        console.error(await response.text());
      }
    } catch (error) {
      console.error("Error al actualizar veterinario", error);
    }
  };

  const onSubmit = (data) => {
    console.log("Datos", data);
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
        <ButtonSubmit msg={`ENVIAR`} clickAction={() => {}} type={`submit`} />
      </form>
    </div>
  );
};

export default FormVeterinario;


