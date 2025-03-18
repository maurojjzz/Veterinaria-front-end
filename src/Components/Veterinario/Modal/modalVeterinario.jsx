import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ModalAlert } from "../../Shared/index.js";
import { Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DetalleVeterinario = ({ vet, onDelete, onClose  }) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/admin/veterinarios/form/${vet.id}`, { params: { ...vet } });
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
        <h3>
          {vet?.nombre} {vet?.apellido}
        </h3>
        <p>
          <strong>Email:</strong> {vet?.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {vet?.telefono}
        </p>
        <p>
          <strong>DNI:</strong> {vet?.nro_doc}
        </p>
        <p>
          <strong>Matrícula:</strong> {vet?.matricula}
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="info" onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={() => setShowModal(true)}>
            Eliminar
          </Button>
        </div>
      </Box>
      <ModalAlert
        text="¿Desea eliminar al veterinario?"
        clickAction={onDelete}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default DetalleVeterinario;
