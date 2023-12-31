import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./form.module.css";
import { practicaSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";

const FormPractica = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dataForm = location.state?.params;

  const practicaDataUpdate = {
    descripcion: dataForm?.descripcion
    
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(practicaSchema),
    defaultValues: {
      ...practicaDataUpdate,
    },
  });

  const goBackToTable = () => {
    setTimeout(() => {
      history.push("/admin/practicas/");  
    }, 2000);
  };
  

  const addPractica = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/practicas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response) {
        console.log("Se creo correctamente");
        goBackToTable();
      } else {
        console.log("no se pudo crear la practica");
      }
    } catch (error) {
      console.error("Error al crear practica", error);
    }
  };

  const updatePractica = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/practicas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response) {
        console.log("response", response);
        console.log("Se actualizo correctamente");
        goBackToTable();
      } else {
        console.log("no se actualizó la practica");
      }
    } catch (error) {
      console.error("Error al actualizar practica", error);
    }
  };

  const onSubmit = (data) => {
    console.log("Datita", data);
    if (!id) {
      addPractica(data);
    } else {
      updatePractica(data);
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
            labelText={`descripcion`}
            placeholder={`Castracion`}
            type={`text`}
            name={"descripcion"}
            register={register}
            error={errors.descripcion?.message}  
        />
        </div>
        <ButtonSubmit msg={`ENVIAR`} clickAction={() => {}} type={`submit`} />
      </form>
    </div>
  );
};

export default FormPractica;
