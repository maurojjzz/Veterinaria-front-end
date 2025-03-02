import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit } from "../../Shared";
import styles from "./form.module.css";
import { razaSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addRaza, updateRaza } from "../../../redux/razas/thunks.js";

import { Box, Typography } from "@mui/material";
import SelectEspecie from "./SelectEspecie/SelectEspecie.jsx";

const RazaForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const dataForm = location.state?.params;

  const { especies } = useSelector((state) => state.especies);

  const razaDataUpdate = {
    descripcion: dataForm?.descripcion,
    especie: dataForm?.especie?.id,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(razaSchema),
    defaultValues: {
      ...razaDataUpdate,
    },
  });

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/admin/raza", { state: { message, type } });
    }, 2000);
  };

  const addPractica = async (data) => {
    try {
      await dispatch(addRaza(data));
      goBackToTable("Raza creada exitosamente");
    } catch (error) {
      goBackToTable("Error al crear raza", "Error");
      console.error("Error al crear raza", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updatePractica = async (data) => {
    try {
      await dispatch(updateRaza(data));
      goBackToTable("Raza actualizada exitosamente");
    } catch (error) {
      goBackToTable("Error al actualizar raza", "Error");
      console.error("Error al actualizar raza", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    let idEspecie = null;
    setIsLoading(true);
    if (!id) {
      idEspecie = especies.find((especie) => especie.descripcion === data.especie);
    }
    if (!id) {
      data.especie = idEspecie.id;
      addPractica(data);
    } else {
      data.id = id;
      updatePractica(data);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        marginTop: "80px",
      }}
    >
      <form
        className={`container d-flex flex-column align-items-center pb-4  rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" pb={4} pt={3}>
          Raza
        </Typography>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Box
            sx={{
              maxWidth: "300px",
              width: "100%",
              marginBottom: "40px",
            }}
          >
            <SelectEspecie
              labelText={`Especie`}
              placeholder={`Especie`}
              name={"especie"}
              register={register}
              error={errors.especie?.message}
              defaultValue={dataForm?.especie}
            />
          </Box>

          <Input
            labelText={`descripcion`}
            placeholder={`Siames`}
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
    </Box>
  );
};

export default RazaForm;
