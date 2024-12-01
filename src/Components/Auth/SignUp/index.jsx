import { useState } from "react";
// import styles from './signup.module.css'
import { Button } from "@mui/material";
import { Toast, ModalAlert } from "../../Shared";

const SignUp = () => {
  const [error, setError] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Sign Up en desarrollo</h1>
      {error && <Toast title={"Info"} message={"Error al loguearse"} setError={setError} />}

      <Button
        variant="contained"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Prueba
      </Button>
      
      <ModalAlert
        text={"Prbando"}
        clickAction={() => {
          setError(false);
          setShowModal(false);
        }}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default SignUp;
