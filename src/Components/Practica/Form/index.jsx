import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./form.module.css";
import { practicaSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "../../../axios-config";

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
      const response = await axios.post("/practicas", data);
      if (response.status >= 200 && response.status < 300) {
        console.log("Se creó correctamente");
        goBackToTable();
      } else {
        console.log("No se pudo crear la práctica");
      }
    } catch (error) {
      console.error("Error al crear práctica", error);
    }
  };

  const updatePractica = async (data) => {
    try {
      const response = await axios.put(`/practicas/${id}`, data);
      if (response.status === 200) {
        console.log("Se actualizó correctamente");
        goBackToTable();
      } else {
        console.log("No se pudo actualizar la práctica");
      }
    } catch (error) {
      console.error("Error al actualizar práctica", error);
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
