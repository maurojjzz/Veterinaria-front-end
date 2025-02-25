import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./especie-form.module.css";
import { especieSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addEspecie, updateEspecie } from "../../../redux/especies/thunks.js";

const FormEspecie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const dataForm = location.state?.params;

  const especieDataUpdate = {
    id: dataForm?.id || id, // ✅ Asegura que el ID esté presente
    descripcion: dataForm?.descripcion || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(especieSchema),
    defaultValues: especieDataUpdate,
  });

  const goBackToTable = () => {
    setTimeout(() => {
      history.push("/admin/especies/");
    }, 2000);
  };

  const addEspecieHandler = async (data) => {
    try {
      await dispatch(addEspecie(data));
      console.log("Especie creada correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al crear especie", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEspecieHandler = async (data) => {
    try {
      console.log("Enviando datos para actualizar:", data); // ✅ Debug ID
      await dispatch(updateEspecie(data));
      console.log("Especie actualizada correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al actualizar especie", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (id) {
      updateEspecieHandler({ ...data, id }); // ✅ Asegura que el ID esté presente
    } else {
      addEspecieHandler(data);
    }
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center p-4 pt-5 rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input
            labelText="Descripción"
            placeholder="Ejemplo: Canina"
            type="text"
            name="descripcion"
            register={register}
            error={errors.descripcion?.message}
          />
        </div>
        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ENVIAR`}
          clickAction={() => {}}
          type="submit"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default FormEspecie;
