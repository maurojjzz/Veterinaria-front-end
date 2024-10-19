import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, ButtonSubmit } from "../../../Shared";
import styles from "./login-form.module.css";
import loginSchema from "../../../../Validations/loginSchema.js";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import Toast from "../../../Shared/Toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/auth/thunks.js";

const LoginForm = () => {
  const [toastMessage, setToastMessage] = useState("Error in database");
  const history = useHistory();

  const dispatch = useDispatch();
  const { error, authenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(loginSchema),
  });

  useEffect(() => {
    if (authenticated) {
      const role = localStorage.getItem("role");
      switch (role) {
        case "Admin":
          history.push("/admin");
          break;
        case "Usuario":
          history.push("/user");
          break;
        case "Veterinario":
          history.push("/vet");
          break;
        default: {
          break;
        }
      }
    }
  }, [authenticated, history]);

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data));
    } catch (error) {
      setToastMessage(error.response.data.error);
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
      {error && <Toast message={toastMessage} title={"Error"} setError={()=>{}} />}
    </div>
  );
};

export default LoginForm;
