import { useState, useEffect } from "react";
import styles from "../Modal/modalCliente.module.css";
import { useHistory } from "react-router-dom";
import { ModalAlert } from "../../Shared/index.js";
import { Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const DetalleCliente = ({ user, onClose, onDelete, setIdUser }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/admin/usuarios/form/${user.id}`, { params: { ...user } });
  };

  useEffect(() => {
    if (user?.id) {
      setIdUser(user.id);
    }
  }, [user?.id, setIdUser]);

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
        <h3>
          {user?.nombre} {user?.apellido}
        </h3>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {user?.telefono}
        </p>
        <p>
          <strong>DNI:</strong> {user?.nro_doc}
        </p>
        <p>
          <strong>Dirección:</strong> {user?.direccion}
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="contained" color="info" onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={() => setShowModal(true)}>
            Eliminar
          </Button>
        </div>
      </Box>

      <ModalAlert
        text="¿Desea eliminar al usuario?"
        clickAction={onDelete}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default DetalleCliente;
