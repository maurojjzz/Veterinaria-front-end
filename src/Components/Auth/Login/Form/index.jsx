import React from "react";
import { useForm } from "react-hook-form";
import { Input, ButtonSubmit } from "../../../Shared";
import styles from "./login-form.module.css";
import loginSchema from "../../../../Validations/loginSchema.js";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";

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

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/auth/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const dataRes = await response.json();
        console.log(dataRes)
        localStorage.setItem("token", dataRes.token);
        localStorage.setItem("role", dataRes.role)
        history.push('/usuarios')
      } else {
        throw new Error("Error en token");
      }

    } catch (error) {
      console.error("Error al intentar logearse ", error);
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
            history.push("/sign-up");
          }}
        >
          Don't have an account? <span className={`forgotPass fw-medium ${styles.forgotPass}`}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
