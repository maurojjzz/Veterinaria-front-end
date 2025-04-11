import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit, SelectUser, SelectPet, SelectVet, CheckPractices, PagosRadio, Toast } from "../../Shared";
import styles from "./atencionesForm.module.css";
import { atencionSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { formateoFecha, justFecha, justHour } from "../../../Functions/utiities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addAtencion, updateAtencion } from "../../../redux/atenciones/thunks.js";
import { getVet } from "../../../redux/veterinarios/thunks.js";
import { getPrecios } from "../../../redux/precios/thunks.js";
import { TextField, Typography } from "@mui/material";

const AtencionForm = () => {
  const [userPet, setUserPet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const dataForm = location.state?.params;

  const { veterinarios } = useSelector((state) => state.veterinarios);

  useEffect(() => {
    dispatch(getVet());
    dispatch(getPrecios());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      setUserPet(dataForm?.mascota?.owner);
    }
  }, [dataForm?.mascota?.owner, id]);

  const atencionDataUpdate = {
    fecha: justFecha(dataForm?.fecha_hora_atencion),
    hora: justHour(dataForm?.fecha_hora_atencion),
    cliente: dataForm?.mascota?.owner,
    forma_de_pago: dataForm?.forma_de_pago,
    importe: dataForm?.importe,
    mascota: dataForm?.mascota?.id,
    pagos: dataForm?.pagos,
    practicas: dataForm?.practicas.map((practica) => practica.id) || [],
    veterinario: dataForm?.veterinario?.id || dataForm?.veterinario,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(atencionSchema),
    defaultValues: {
      ...atencionDataUpdate,
    },
  });

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/admin/atenciones", { state: { message, type } });
    }, 2000);
  };

  const addAtenciones = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(addAtencion(data));
      goBackToTable("Se creó correctamente");
    } catch (error) {
      console.error("Error al crear atención", error);
      const msg = error?.response?.data?.message || "Hubo un error al crear atencion. Intente más tarde nuevamente";
      setToastMessage(msg);
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updateAtenciones = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(updateAtencion(data));
      goBackToTable("Se actualizó correctamente");
    } catch (error) {
      console.error("Error al actualizar atención", error);
      const msg = error?.response?.data?.message || "Hubo un error al actualizar atencion. Intente más tarde nuevamente";
      setToastMessage(msg);
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    data.fecha_hora_atencion = formateoFecha(data.fecha, data.hora);
    const { hora, fecha, cliente, ...atencionObj } = data;
    atencionObj.veterinario = veterinarios.find((v) => v.email === atencionObj.veterinario)?.id;
    if (!id) {
      addAtenciones(atencionObj);
    } else {
      atencionObj.id = id;
      updateAtenciones(atencionObj);
    }
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center pb-4 rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" pb={4} pt={3}>
          Atención
        </Typography>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText={`Fecha Atencion`}
            placeholder={`25/05/2022`}
            type={`date`}
            name={"fecha"}
            register={register}
            error={errors.fecha?.message}
          />
          <Input
            labelText={`Hora`}
            placeholder={`10:00`}
            type={`time`}
            name={"hora"}
            register={register}
            error={errors.hora?.message}
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
            setValue={setValue}
            defaultValue={atencionDataUpdate.cliente}
          />
          <SelectPet
            mascotas={userPet.mascotas}
            error={errors.mascota?.message}
            register={register}
            name={`mascota`}
            defaultValue={atencionDataUpdate.mascota}
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
            setValue={setValue}
            defaultValue={atencionDataUpdate.veterinario}
          />
          <CheckPractices
            labelText={`Practicas`}
            placeholder={``}
            name={"practicas"}
            register={register}
            error={errors.practicas?.message}
            setValue={setValue}
            defaultValue={atencionDataUpdate.practicas}
          />
        </div>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <TextField
            label={`Importe`}
            type={`number`}
            name={"importe"}
            value={getValues("importe") || 0}
            {...register("importe")}
            disabled
            // error={!!errors.importe}
            // helperText={errors.importe?.message}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              border: "1px solid #1BBCB6",
              borderRadius: "5px",
              width: "100%",
              maxWidth: "300px",
              mt: "-25px",
              mb: "30px",
              "& .MuiInputLabel-root": {
                color: "#1BBCB6",
                backgroundColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "#1BBCB6",
                fontSize: "16px",
                fontWeight: "normal",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                color: "#1BBCB6",
                WebkitTextFillColor: "#1BBCB6",
              },
            }}
          />
          <PagosRadio name={"forma_de_pago"} register={register} error={errors.forma_de_pago?.message} />
        </div>

        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `ENVIAR`}
          clickAction={() => {}}
          type={`submit`}
          disabled={isLoading}
        />
      </form>
      {showToast && <Toast title={"Error"} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default AtencionForm;
