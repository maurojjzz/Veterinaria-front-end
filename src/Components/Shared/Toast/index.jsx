import { useState } from "react";
import styles from "./toast.module.css";
import { Slide } from "@mui/material";

function Toast({ title, message, setError, dataTestId  }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setError(false), 300);
  };

  return (
    <Slide in={visible} direction="down" timeout={500}>
      <div data-testid={dataTestId} className={`d-flex flex-row bg-light rounded-2 justify-content-between ${styles.container}`}>
        <div className="d-flex flex-row ">
          <div
            className={` ${styles.borderStart} ${
              title === "Error"
                ? styles.error
                : title === "Success"
                ? styles.success
                : title === "Warning"
                ? styles.warning
                : title === "Info"
                ? styles.info
                : ""
            }`}
          ></div>
          <div className={`d-flex flex-column justify-content-center align-items-center ${styles.iconoToast}`}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/${
                title === "Error"
                  ? "cross.png"
                  : title === "Success"
                  ? "check.png"
                  : title === "Warning"
                  ? "caution.png"
                  : title === "Info"
                  ? "information.png"
                  : ""
              }`}
              alt={`dog footprint logo`}
              className={`${styles.iconimg}`}
            />
          </div>
        </div>
        <div className={` d-flex flex-column justify-content-center flex-grow-1 p-2 ${styles.TextoToast}`}>
          <h2>{title}</h2>
          <div>{message}</div>
        </div>
        <div
          className={`d-flex flex-column pt-3  pe-2 ${styles.cerrarToast}`}
          onClick={handleClose}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/close.png`}
            alt={`dog footprint logo`}
            className={`${styles.iconClose}`}
          />
        </div>
      </div>
    </Slide>
  );
}

export default Toast;
