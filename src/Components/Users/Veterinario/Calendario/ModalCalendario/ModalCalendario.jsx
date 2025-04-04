import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { handleDate } from "../../../../../Functions/utiities.js";
import { useDispatch, useSelector } from "react-redux";
import { getRazas } from "../../../../../redux/razas/thunks.js";
import { initUsers } from "../../../../../redux/users/thunks.js";
import { addPago } from "../../../../../redux/pagos/thunks.js";
import { getAtenciones } from "../../../../../redux/atenciones/thunks.js";
import { useHistory } from "react-router-dom";

const ModalCalendario = ({ onClose, selectedEvent, setToastType, setToastMessage, setShowToast }) => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(selectedEvent?.extendedProps?.atencionData || {});
  const [owner, setOwner] = useState({});
  const [pet, setPet] = useState({});

  const dispatch = useDispatch();

  const history = useHistory();

  const { razas } = useSelector((state) => state.razas);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getRazas());
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    if (data?.mascota?.owner && data?.mascota?.id) {
      const petFound = razas?.find((raza) => raza.mascotas.some((mascota) => mascota.id === data.mascota.id));
      const ownerFound = users?.find((user) => user.id === data.mascota.owner);

      if (petFound) {
        setPet(petFound);
      }

      if (ownerFound) {
        setOwner(ownerFound);
      }
    }
  }, [data, razas, users]);

  if (!selectedEvent) return null;

  const handleEdit = (ate) => {
    history.push(`/vet/atenciones/form/${ate.id}`, { params: { ...ate } });
  };

  const handleAddPago = async () => {
    const pago = {
      atencion: data?.id,
      importe: data?.importe,
      fecha_hora_pago: new Date().toISOString(),
      forma_de_pago: data?.forma_de_pago,
      cuotas: 1,
      nro_cuota: 1,
    };
    try {
      await dispatch(addPago(pago));
      setShowToast(true);
      setToastMessage("Pago registrado exitosamente");
      setToastType("Success");
    } catch (error) {
      setShowToast(true);
      setToastMessage("Hubo un error al registrar el pago");
      setToastType("Error");
    } finally {
      await dispatch(getAtenciones());
      onClose();
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "5",
      }}
    >
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "500px",
          width: "80%",
          paddingBottom: "50px",
          backgroundColor: "rgb(243, 244, 245)",
          boxShadow: "10px 7px 10px 1px rgba(0, 0, 0, 0.44)",
          borderRadius: "10px",
          border: "2px solid rgba(0, 0, 0, 0.12)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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

        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Detalles de la Atención
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Mascota:</strong> {data?.mascota?.nombre}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Especie:</strong> {pet?.especie?.descripcion}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Raza:</strong> {pet?.descripcion}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Dueño:</strong> {owner?.nombre} {owner?.apellido}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Fecha:</strong> {handleDate(data?.fecha_hora_atencion)}
        </Typography>

        {data?.veterinario?.id && data?.practicas.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Veterinario:</strong> {`${data?.veterinario?.nombre} ${data?.veterinario?.apellido}`}
            </Typography>

            <Typography variant="h6">Practicas</Typography>

            {data?.practicas.map((practica) => (
              <Typography key={practica.id} variant="caption" sx={{ mb: 1 }}>
                {practica?.descripcion}
              </Typography>
            ))}
            {data?.pagos[0]?.fecha_hora_pago ? (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Importe:</strong> ${data?.pagos[0]?.importe}
              </Typography>
            ) : (
              <Box>
                <Typography variant="h6" color="error" sx={{ mb: 1 }}>
                  No ha sido pagado
                </Typography>

                <Button variant="outlined" sx={{ mt: 2 }} color="success" onClick={() => handleAddPago()}>
                  Informar pago
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="h5" color="error">
            No ha sido atendido aún
          </Typography>
        )}

        <Button variant="outlined" sx={{ mt: 2 }} color="info" onClick={() => handleEdit(data)}>
          Completar atencion
        </Button>
      </Box>
    </Box>
  );
};

export default ModalCalendario;
