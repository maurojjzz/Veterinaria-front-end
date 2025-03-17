import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVet } from "../../../redux/veterinarios/thunks.js";
import { ModalAlert, Toast } from "../../Shared/index.js";
import { Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DetalleVeterinario = ({
  vet,
  setData,
  onClose,
  setToastMessage,
  setToastType,
}) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = () => {
    history.push(`/admin/veterinarios/form/${vet.id}`, { params: { ...vet } });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteVet(vet.id));
      setData((prevData) => prevData.filter((v) => v.id !== vet.id));
      setToastMessage("Veterinario eliminado correctamente");
      setToastType("Info");
    } catch (error) {
      console.log(error);
      setToastMessage("Error al eliminar veterinario");
      setToastType("Error");
    } finally {
      setShowModal(false);
      setTimeout(() => onClose(), 300);
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
          <Button
            variant="contained"
            color="error"
            onClick={() => setShowModal(true)}
          >
            Eliminar
          </Button>
        </div>
      </Box>
      <ModalAlert
        text="¿Desea eliminar al veterinario?"
        clickAction={handleDelete}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default DetalleVeterinario;
