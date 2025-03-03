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
import { addPrecio } from "../../../redux/precios/thunks.js";
import { Typography } from "@mui/material";
import { justFecha } from "../../../Functions/utiities.js";

const FormPractica = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const dataForm = location.state?.params;

  const getNearestPrice = (precios) => {
    if (!precios || precios.length === 0) return "";

    const today = new Date();

    const nearest = precios
      .map((p) => ({ ...p, fecha: new Date(p.fecha) }))
      .sort((a, b) => Math.abs(a.fecha - today) - Math.abs(b.fecha - today))[0];

    return nearest ? nearest.valor : "";
  };

  const practicaDataUpdate = {
    descripcion: dataForm?.descripcion,
    precio: getNearestPrice(dataForm?.precios) || "",
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

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/admin/practicas/", { state: { message, type } });
    }, 2000);
  };

  const addPractica = async (data) => {
    try {
      const practicaCreada = await dispatch(addPract(data));
      await dispatch(addPrecio({ fecha: justFecha(new Date()), valor: data.precio, practica: practicaCreada.id }));
      goBackToTable("Se creó correctamente");
    } catch (error) {
      console.error("Error al crear práctica", error);
      goBackToTable("Error al crear práctica", "Error");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updatePractica = async (data) => {
    try {
      await dispatch(updatePract(data));

      if (data.precio !== getNearestPrice(dataForm?.precios)) {
        await dispatch(addPrecio({ fecha: new Date(), valor: data.precio, practica: id }));
      }
      goBackToTable("Se actualizó correctamente");
    } catch (error) {
      console.error("Error al actualizar práctica", error);
      goBackToTable("Error al actualizar práctica", "Error");
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
            labelText={`Descripcion`}
            placeholder={`Castracion`}
            type={`text`}
            name={"descripcion"}
            register={register}
            error={errors.descripcion?.message}
          />
          <Input
            labelText={`Precio`}
            placeholder={`$1500`}
            type={`number`}
            name={"precio"}
            register={register}
            error={errors.precio?.message}
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
