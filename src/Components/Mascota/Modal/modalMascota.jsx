import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ModalAlert } from "../../Shared/index.js";
import { Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { justFecha } from "../../../Functions/utiities.js";

const DetalleMascota = ({ mascota, onClose, especies, onDelete, setIdMas }) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();


  useEffect(() => {
    if (mascota?.id) {
      setIdMas(mascota.id);
    }
  }, [ mascota.id, setIdMas]);


  const handleEdit = () => {
    history.push(`/admin/mascota/form/${mascota.id}`, {
      params: { ...mascota, fecha_nacimiento: justFecha(mascota.fecha_nacimiento) },
    });
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
        <h3>{mascota?.nombre}</h3>
        <p><strong>Sexo:</strong> {mascota?.sexo}</p>
        <p><strong>Especie:</strong> {especies.find((es) => es.id === mascota?.raza?.especie)?.descripcion || "Desconocida"}</p>
        <p><strong>Raza:</strong> {mascota?.raza?.descripcion || "No especificada"}</p>
        <p><strong>Fecha de Nacimiento:</strong> {justFecha(mascota?.fecha_nacimiento) || "No registrada"}</p>
        <p><strong>Dueño:</strong> {mascota?.owner?.nombre} {mascota?.owner?.apellido}</p>
        <p><strong>Email del Dueño:</strong> {mascota?.owner?.email}</p>

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
        text="¿Desea eliminar la mascota?"
        clickAction={onDelete}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default DetalleMascota;
