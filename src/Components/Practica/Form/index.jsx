import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./form.module.css";
import { practicaSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addPract, updatePract } from "../../../redux/practicas/thunks.js";
import { Typography } from "@mui/material";

const FormPractica = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const dataForm = location.state?.params;

  const practicaDataUpdate = {
    descripcion: dataForm?.descripcion,
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
      await dispatch(addPract(data));
      console.log("Se creó correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al crear práctica", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updatePractica = async (data) => {
    try {
      await dispatch(updatePract(data));
      console.log("Se actualizó correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al actualizar práctica", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (!id) {
      addPractica(data);
    } else {
      data.id = id;
      updatePractica(data);
    }
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center pb-4  rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" pb={4} pt={3}>
          Practica
        </Typography>
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

export default FormPractica;
