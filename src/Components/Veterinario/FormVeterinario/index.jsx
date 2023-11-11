import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Shared";
import styles from './formVeterinario.module.css';
import { veterinarioSchema } from "../../../Validations";
import { joiResolver } from '@hookform/resolvers/joi';

const FormVeterinario = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(veterinarioSchema) 
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form
        className={`container d-flex flex-column align-items-center p-4 pt-5 rounded-3 ${styles.formContainer} `}
        onSubmit={handleSubmit(onSubmit)}>
        <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input labelText={`Matrícula`} placeholder={`123456`} type={`text`} name={'matricula'} register={register} />
          <Input labelText={`Nombre`} placeholder={`Nombre`} type={`text`} name={'nombre'} register={register} />
          </div>
          <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input labelText={`Apellido`} placeholder={`Apellido`} type={`text`} name={'apellido'} register={register} />
          <Input labelText={`Teléfono`} placeholder={`Teléfono`} type={`text`} name={'telefono'} register={register} />
          </div>
          <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input labelText={`Email`} placeholder={`Email`} type={`email`} name={'email'} register={register} />
          <Input labelText={`Nro Documento`} placeholder={`Nro Documento`} type={`text`} name={'nro_doc'} register={register} />
          </div>
          <div className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}>
          <Input labelText={`Rol`} placeholder={`Rol`} type={`text`} name={'rol'} register={register} />
          <Input labelText={`Contraseña`} placeholder={`Contraseña`} type={`Password`} name={'password'} register={register} />
        </div>
        <button className="btn btn-primary" type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default FormVeterinario;
