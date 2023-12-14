import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit, SelectUser, SelectPet, SelectVet, CheckPractices } from "../../Shared";
import styles from "./atencionesForm.module.css";
import { atencionSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";

const AtencionForm = () => {
  const [userPet, setUserPet] = useState({});

  const { id } = useParams();
  // const location = useLocation();
  const history = useHistory();

  // const dataForm = location.state?.params;

  // const usuarioDataUpdate = {
  //   nombre: dataForm?.nombre,
  //   apellido: dataForm?.apellido,
  //   email: dataForm?.email,
  //   password: dataForm?.password,
  //   telefono: dataForm?.telefono,
  //   nro_doc: dataForm?.nro_doc,
  //   direccion: dataForm?.direccion,
  //   rol: dataForm?.rol || "65334d8d48ec52ff5e08c85a",
  //   mascotas: dataForm?.mascotas,
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(atencionSchema),
    // defaultValues: {
    //   ...usuarioDataUpdate,
    // },
  });

  const goBackToTable = () => {
    setTimeout(() => {
      history.push("/admin");
    }, 2000);
  };

  // const addUser = async (data) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_KEY}/usuarios`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (response.ok) {
  //       console.log("Se creo correctamente");
  //       goBackToTable();
  //     } else {
  //       console.log("no se pudo crear el usuario");
  //     }
  //   } catch (error) {
  //     console.error("Error al crear usuario", error);
  //   }
  // };

  // const updateUser = async (data) => {
  //   try {
  //     data.mascotas = Array.from(new Set(data.mascotas.map((mascota) => mascota.id)));
  //     console.log(data.mascotas);

  //     const response = await fetch(`${process.env.REACT_APP_API_KEY}/usuarios/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (response.ok) {
  //       console.log("response", response);
  //       console.log("Se actualizo correctamente");
  //       goBackToTable();
  //     } else {
  //       console.log("no se actualizar crear el usuario");
  //     }
  //   } catch (error) {
  //     console.error("Error al actualizar usuario", error);
  //   }
  // };

  const onSubmit = (data) => {
    console.log(data, "data");
    if (!id) {
      // addUser(data);
    } else {
      // updateUser(data);
    }
  };

  // console.log(errors, "errors");

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
            labelText={`Fecha Atencion`}
            placeholder={`Lionel`}
            type={`date`}
            name={"fecha"}
            register={register}
            error={errors.fecha?.message}
          />
          <Input
            labelText={`Hora`}
            placeholder={`Messi`}
            type={`time`}
            name={"hora"}
            register={register}
            error={errors.hora?.message}
          />
        </div>

        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Importe`}
            placeholder={`Lionel`}
            type={`text`}
            name={"importe"}
            register={register}
            error={errors.importe?.message}
          />
          <Input
            labelText={`Forma de pago`}
            placeholder={`Messi`}
            type={`text`}
            name={"forma_de_pago"}
            register={register}
            error={errors.forma_de_pago?.message}
          />
        </div>

        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <SelectUser
            labelText={`E-mail del cliente`}
            placeholder={`messi@messi.com`}
            type={`text`}
            name={"cliente"}
            register={register}
            error={errors.cliente?.message}
            setUserPet={setUserPet}
          />
          <SelectPet
            mascotas={userPet.mascotas}
            error={errors.mascotas?.message}
            register={register}
            name={`mascotas`}
          />
        </div>

        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <SelectVet
            labelText={`E-mail del veterinario`}
            placeholder={`messi@messi.com`}
            type={`text`}
            name={"veterinario"}
            register={register}
            error={errors.veterinario?.message}
          />
          <CheckPractices
            labelText={`Practicas`}
            placeholder={`Inyeccion`}
            name={"practicas"}
            register={register}
            error={errors.practicas?.message}
          />
        </div>

        <ButtonSubmit msg={`ENVIAR`} clickAction={() => {}} type={`submit`} />
      </form>
    </div>
  );
};

export default AtencionForm;
