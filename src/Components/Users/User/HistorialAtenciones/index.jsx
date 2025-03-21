import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones } from "../../../../redux/atenciones/thunks.js";
import { decodeToken } from "../../../../Functions/utiities.js";
import styles from "./HistorialAtenciones.module.css";
import BloqueoMascota from "../Mascota/BloqueoMascota/BloqueoMascota.jsx";
import { Toast } from "../../../Shared";
import { Box, CircularProgress, Typography } from "@mui/material";
import FechaFiltro from "./FechaFiltro/FechaFiltro";
import SwitchFiltro from "./Switch/Switch";

const HistorialAtenciones = () => {
  const [atencionesFiltradasYOrdenadas, setAtencionesFiltradasYOrdenadas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const dispatch = useDispatch();
  const { atenciones } = useSelector((state) => state.atenciones);

  const history = useHistory();
  const location = useLocation();

  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/user/historial-atenciones", {});
    }
  }, [location, history]);

  const handleDateChange = (type, value) => {
    if (type === "start") {
      const newStartDate = value;
      const start = newStartDate ? new Date(newStartDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (end && start > end) {
        setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
        setIsModalOpen(true);
        setStartDate("");
        setEndDate("");
        return;
      }

      setError("");
      setIsModalOpen(false);
      setStartDate(newStartDate);
    } else if (type === "end") {
      const newEndDate = value;
      const start = startDate ? new Date(startDate) : null;
      const end = newEndDate ? new Date(newEndDate) : null;

      if (start && end < start) {
        setError("La fecha de fin no puede ser anterior a la fecha de inicio.");
        setIsModalOpen(true);
        setStartDate("");
        setEndDate("");
        return;
      }
      setError("");
      setIsModalOpen(false);
      setEndDate(newEndDate);
    }
  };

  const handleSwitchChange = (event) => {
    setIsPending(event.target.checked);
  };

  useEffect(() => {
    dispatch(getAtenciones());
  }, [dispatch]);

  useEffect(() => {
    if (usuario && usuario.id) {
      setAtencionesFiltradasYOrdenadas(atenciones.filter((atencion) => atencion?.mascota?.owner === usuario?.id));
    }
  }, [atenciones, usuario, isPending]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        setUsuario({ id: decodedToken.id, nombre: decodedToken.name, email: decodedToken.email });
      } catch (error) {
        setUsuario(null);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let atencionesFiltradas = atencionesFiltradasYOrdenadas
      .filter((atencion) => {
        const atencionDate = new Date(atencion.fecha_hora_atencion);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? addOneDay(new Date(endDate)) : null;

        const isAfterStart = !start || atencionDate >= start;
        const isBeforeEnd = !end || atencionDate < end;

        const isPendingFilter = isPending ? atencion.pagos.length === 0 : true;

        return isAfterStart && isBeforeEnd && isPendingFilter;
      })
      .sort((a, b) => new Date(b.fecha_hora_atencion).getTime() - new Date(a.fecha_hora_atencion).getTime());

    setTimeout(() => {
      if (JSON.stringify(atencionesFiltradas) !== JSON.stringify(atencionesFiltradasYOrdenadas)) {
        setAtencionesFiltradasYOrdenadas(atencionesFiltradas);
      }
      setIsLoading(false);
    }, 700);
  }, [startDate, endDate, atencionesFiltradasYOrdenadas, isPending]);

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          maxWidth: "1100px",
          width: "95%",
          margin: "0 auto",
          padding: "2rem",
          background: " #f8f9fa",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className={styles.title}>Atenciones</h2>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FechaFiltro startDate={startDate} endDate={endDate} handleDateChange={handleDateChange} />

          <SwitchFiltro checked={isPending} onChange={handleSwitchChange} />
        </Box>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Advertencia</h2>
              <p>{error}</p>
              <button onClick={() => setIsModalOpen(false)}>Entendido</button>
            </div>
          </div>
        )}

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
              height: "390px",
            }}
          >
            <CircularProgress size={100} />
          </Box>
        ) : atencionesFiltradasYOrdenadas.length > 0 ? (
          <div className={styles.grid}>
            {atencionesFiltradasYOrdenadas.map((atencion) => (
              <div key={atencion.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Atención </h3>
                  <h3 className={styles.cardTitle}>#{atencion.id}</h3>
                </div>
                <div className={styles.cardContent}>
                  <p>
                    <strong>Fecha de Atención:</strong> {new Date(atencion.fecha_hora_atencion).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Mascota:</strong> {atencion?.mascota?.nombre}
                  </p>
                  <p>
                    {atencion?.pagos?.length > 0 ? (
                      <p>
                        {" "}
                        <strong>Monto:</strong>${atencion?.pagos[0]?.importe}{" "}
                      </p>
                    ) : (
                      <Typography variant="body1" color="error">
                        {" "}
                        <strong>Estado:</strong> Pendiente de pago
                      </Typography>
                    )}
                  </p>
                  {atencion?.descripcion && (
                    <p>
                      <strong>Descripción:</strong> {atencion?.descripcion}
                    </p>
                  )}
                  <Typography
                    variant="p"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <strong>Practica:</strong>
                  </Typography>
                  {atencion?.practicas?.length > 0 ? (
                    atencion?.practicas?.map((practica) => (
                      <Typography variant="body1" sx={{ display: "flex", justifyContent: "center" }} key={practica.id}>
                        {practica?.descripcion}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="h6" color="error" sx={{ display: "flex", justifyContent: "center" }}>
                      No ha sido atendido
                    </Typography>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && <p className={styles.noData}>No hay atenciones registradas en el período seleccionado.</p>
        )}

        <BloqueoMascota />
        {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
      </Box>
    </Box>
  );
};

export default HistorialAtenciones;
