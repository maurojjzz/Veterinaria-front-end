import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { Input, ButtonSubmit } from "../../../Shared";
import styles from "./login-form.module.css";
import loginSchema from "../../../../Validations/loginSchema.js";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import axios from "../../../../axios-config";


const LoginForm = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(loginSchema),
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'Admin':
        history.push('/admin');
        break;
      case 'Usuario':
        history.push('/user');
        break;
      case 'Veterinario':
        history.push('/vet');
        break;
      default: {
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/auth/login', data);
      console.log(response);
  
      if (response.status === 200) {
        const dataRes = response.data;
        localStorage.setItem("token", dataRes.token);
        localStorage.setItem("role", dataRes.role);
  
        switch (dataRes.role) {
          case 'Admin':
            history.push('/admin');
            break;
          case 'Usuario':
            history.push('/user');
            break;
          case 'Veterinario':
            history.push('/vet');
            break;
          default: {
            console.log('Error con el rol del usuario');
            break;
          }
        }
      } else {
        throw new Error("Error al intentar logearse");
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center gap-4 ${styles.loginFormContainer}`}>
      <h1 className={` ${styles.tituloForm}`}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={`d-flex flex-column align-items-center w-100`}>
        <Input
          labelText={`Email`}
          placeholder={`messi@gmail.com`}
          type={`email`}
          name={"email"}
          register={register}
          error={errors.email?.message}
        />
        <Input
          labelText={`Contraseña`}
          placeholder={`Contraseña123`}
          type={`Password`}
          name={"password"}
          register={register}
          error={errors.password?.message}
        />
        <ButtonSubmit msg={`LOGIN`} clickAction={() => {}} type={`submit`} />
      </form>
      <div className={`w-100`}>
        <p className={`${styles.forgotPass} ${styles.cursor} fw-medium text-center`}>Forgot password?</p>
        <p
          className={`${styles.cursor}  fw-normal text-center`}
          onClick={() => {
            history.push("/auth/sign-up");
          }}
        >
          Don't have an account? <span className={`forgotPass fw-medium ${styles.forgotPass}`}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
