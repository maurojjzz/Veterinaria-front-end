import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Input, ButtonSubmit, SelectUser, SelectPet, SelectVet, CheckPractices, PagosRadio } from "../../Shared";
import styles from "./atencionesForm.module.css";
import { atencionSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { formateoFecha, justFecha, justHour } from "../../../Functions/utiities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addAtencion, updateAtencion } from "../../../redux/atenciones/thunks.js";
import { getVet } from "../../../redux/veterinarios/thunks.js";

const AtencionForm = () => {
  const [userPet, setUserPet] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const dataForm = location.state?.params;

  const { veterinarios } = useSelector((state) => state.veterinarios);

  // console.log(veterinarios);

  useEffect(() => {
    dispatch(getVet());
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
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(atencionSchema),
    defaultValues: {
      ...atencionDataUpdate,
    },
  });

  const goBackToTable = () => {
    setTimeout(() => {
      history.push("/admin/atenciones");
    }, 2000);
  };

  const addAtenciones = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(addAtencion(data));
      console.log("Se creó correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al crear atención", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updateAtenciones = async (data) => {
    console.log(data, "datota");
    setIsLoading(true);
    try {
      await dispatch(updateAtencion(data));
      console.log("Se actualizó correctamente");
      goBackToTable();
    } catch (error) {
      console.error("Error al actualizar atención", error);
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
            placeholder={`Inyeccion`}
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
          <Input
            labelText={`Importe`}
            placeholder={`Lionel`}
            type={`text`}
            name={"importe"}
            register={register}
            error={errors.importe?.message}
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
    </div>
  );
};

export default AtencionForm;
