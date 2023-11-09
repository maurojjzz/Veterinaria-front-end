import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Shared";
import styles from './form.module.css';
import {usuarioSchema}  from "../../../Validations";
import { joiResolver } from '@hookform/resolvers/joi';


const FormClient = () => {
  const { register, handleSubmit, formState:{errors} } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(usuarioSchema)
  });

  const onSubmit = (data)=>{
    console.log(data)
    console.log(errors)
  }

  return (
    <div className={`flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5 `}>
      <form className={`container d-flex flex-column p-4 ${styles.formContainer} `} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText={`Nombre`} placeholder={`Lionel`} type={`text`} name={'nombre'} register={register}/>
        <Input labelText={`Apellido`} placeholder={`Messi`} type={`text`} name={'apellido'} register={register}/>
        <Input labelText={`Email`} placeholder={`liomessigamer@gmail.com`} type={`email`} name={'email'} register={register}/>
        <Input labelText={`Direccion`} placeholder={`Alberdi 4250`} type={`text`} name={'direccion'} register={register}/>
        <Input labelText={`Nro Documento`} placeholder={`42168754`} type={`text`} name={'nro_doc'} register={register}/>
        <Input labelText={`Telefono`} placeholder={`+54 3416598754`} type={`text`} name={'telefono'} register={register}/>
        <Input labelText={`Contraseña`} placeholder={`Contraseña123`} type={`Password`} name={'password'} register={register}/>
        <button className="btn btn-primary" type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default FormClient;
