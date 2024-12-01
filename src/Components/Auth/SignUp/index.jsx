import { useState } from "react";
// import styles from './signup.module.css'
import { Toast, ModalAlert } from "../../Shared";

const SignUp = () => {
  const [error, setError] = useState(true);




  return (
    <div>
      <h1>Sign Up en desarrollo</h1>
      {error && <Toast title={"Info"} message={"Error al loguearse"} setError={setError} />}

      <ModalAlert text={"Prbando"} clickAction={() => setError(false)} />

    </div>
  );
};

export default SignUp;
