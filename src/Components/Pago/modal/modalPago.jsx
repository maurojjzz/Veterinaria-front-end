import React, { useState } from "react";
import { Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./pagoDetalle.module.css";
import { ModalAlert, Toast } from "../../Shared";
import { useDispatch } from "react-redux";
import { deletePago } from "../../../redux/pagos/thunks.js";

const PagoDetalle = ({ pago, onClose, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const dispatch = useDispatch();

  if (!pago) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deletePago(pago.id));
      setData((prevData) => prevData.filter((p) => p.id !== pago.id));
      setToastMessage("Pago eliminado correctamente");
      setToastType("Info");
    } catch (error) {
      console.error(error);
      setToastMessage("Error al eliminar pago");
      setToastType("Error");
    } finally {
      setShowToast(true);
      setShowModal(false);
      onClose(); 
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "75px",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.56)",
        width: "100%",
        height: "calc(100vh - 75px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          backgroundColor: "white",
          width: "90%",
          maxWidth: "500px",
          py: "40px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          size="large"
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <h3>Detalle del Pago</h3>
        <p><strong>Atención:</strong> {pago?.atencion?.id}</p>
        <p><strong>Forma de Pago:</strong> {pago?.forma_de_pago}</p>
        <p><strong>Importe:</strong> ${pago?.importe.toLocaleString()}</p>
        <p><strong>Cuotas:</strong> {pago?.cuotas}</p>
        <p><strong>Nro. Cuota:</strong> {pago?.nro_cuota}</p>
        <p><strong>Fecha:</strong> {new Date(pago?.fecha_hora_pago).toLocaleString()}</p>

        <div className={styles.buttonContainer}>
          <Button variant="contained" color="error" onClick={() => setShowModal(true)}>
            Eliminar
          </Button>
        </div>
      </Box>

      <ModalAlert
        text="¿Desea eliminar este pago?"
        clickAction={handleDelete}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </Box>
  );
};

export default PagoDetalle;


