import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Shared";
import styles from "./form.module.css";
import { usuarioSchema } from "../../../Validations";
import { joiResolver } from "@hookform/resolvers/joi";

const FormClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(usuarioSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center p-4 pt-5 rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input
            labelText={`Nombre`}
            placeholder={`Lionel`}
            type={`text`}
            name={"nombre"}
            register={register}
            error={errors.nombre?.message}
          />
          <Input
            labelText={`Apellido`}
            placeholder={`Messi`}
            type={`text`}
            name={"apellido"}
            register={register}
            error={errors.apellido?.message}
          />
        </div>

        <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
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
        </div>
        <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input
            labelText={`Nro Documento`}
            placeholder={`42168754`}
            type={`text`}
            name={"nro_doc"}
            register={register}
            error={errors.nro_doc?.message}
          />
          <Input
            labelText={`Telefono`}
            placeholder={`+54 3416598754`}
            type={`text`}
            name={"telefono"}
            register={register}
            error={errors.telefono?.message}
          />
        </div>
        <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input
            labelText={`Contraseña`}
            placeholder={`Contraseña123`}
            type={`Password`}
            name={"password"}
            register={register}
            error={errors.password?.message}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormClient;
