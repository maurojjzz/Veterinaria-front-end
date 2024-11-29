import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, ButtonSubmit } from "../../../Shared";
import styles from "./login-form.module.css";
import loginSchema from "../../../../Validations/loginSchema.js";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import Toast from "../../../Shared/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/auth/thunks.js";

const LoginForm = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      await dispatch(login(data));
    } catch (axiosError) {
      const backenderror = axiosError.response?.data?.error || "Error en la conexion con la base de datos";
      setToastMessage(error || backenderror);
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setShowToast(true);
    }
  }, [error]);

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
        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : `LOGIN`}
          clickAction={() => {}}
          type={`submit`}
        />
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
      {showToast && (
        <Toast
          message={toastMessage}
          title={"Error"}
          setError={() => {
            setShowToast(false);
          }}
        />
      )}
    </div>
  );
};

export default LoginForm;
