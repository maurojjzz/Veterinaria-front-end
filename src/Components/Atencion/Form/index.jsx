import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit, SelectUser, SelectPet } from "../../Shared";
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

  console.log(userPet);

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
    if (!id) {
      // addUser(data);
    } else {
      // updateUser(data);
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
            name={"pagos"}
            register={register}
            error={errors.pagos?.message}
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
          <div className="form-floating">
            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
              <option defaultValue>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label htmlFor="floatingSelect">Veterinario</label>
          </div>
          <div className="form-floating">
            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
              <option defaultValue>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label htmlFor="floatingSelect">Practicas</label>
          </div>
        </div>

        {/* <div
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
        </div> */}

        <ButtonSubmit msg={`ENVIAR`} clickAction={() => {}} type={`submit`} />
      </form>
    </div>
  );
};

export default AtencionForm;
