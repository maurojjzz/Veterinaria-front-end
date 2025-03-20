import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones } from "../../../../redux/atenciones/thunks.js";
import { decodeToken } from "../../../../Functions/utiities.js";
import styles from "./HistorialAtenciones.module.css";
import BloqueoMascota from "../Mascota/BloqueoMascota/BloqueoMascota.jsx";
import { Toast } from "../../../Shared";
import { Box } from "@mui/material";

const HistorialAtenciones = () => {
  const [atencionesFiltradasYOrdenadas, setAtencionesFiltradasYOrdenadas] = useState([]);
  const [usuario, setUsuario] = useState(null);

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
        return;
      }
      setError("");
      setIsModalOpen(false);
      setEndDate(newEndDate);
    }
  };
  


  useEffect(() => {
    dispatch(getAtenciones());
  }, [dispatch]);


  useEffect(() => {
    if (usuario && usuario.id) {
      setAtencionesFiltradasYOrdenadas(atenciones.filter((atencion) => atencion?.mascota?.owner === usuario?.id))
    }

  }, [atenciones, usuario]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        setUsuario({ id: decodedToken.id, nombre: decodedToken.name, email: decodedToken.email });
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setUsuario(null);
      }
    }
  }, []);


  useEffect(() => {
    let atencionesFiltradas = atencionesFiltradasYOrdenadas
      .filter((atencion) => {
        const atencionDate = new Date(atencion.fecha_hora_atencion);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? addOneDay(new Date(endDate)) : null;
  
        const isAfterStart = !start || atencionDate >= start;
        const isBeforeEnd = !end || atencionDate < end;
  
        return isAfterStart && isBeforeEnd;
      })
      .sort((a, b) => new Date(b.fecha_hora_atencion).getTime() - new Date(a.fecha_hora_atencion).getTime());
  
    setAtencionesFiltradasYOrdenadas(atencionesFiltradas);
  }, [startDate, endDate]);
  

  return (
    <Box className={styles.container}>
      <h2 className={styles.title}>Atenciones</h2>
      <div className={styles.filterContainer}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          className={styles.dateInput}
        />
        <span className={styles.separator}>a</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange("end", e.target.value)}
          className={styles.dateInput}
        />
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Advertencia</h2>
            <p>{error}</p>
            <button onClick={() => setIsModalOpen(false)}>Entendido</button>
          </div>
        </div>
      )}

      {atencionesFiltradasYOrdenadas.length > 0 ? (
        <div className={styles.grid}>
          {atencionesFiltradasYOrdenadas.map((atencion) => (
            <div key={atencion.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Atención #{atencion.id}</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Fecha de Atención:</strong> {new Date(atencion.fecha_hora_atencion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Mascota:</strong> {atencion?.mascota?.nombre}
                </p>
                <p>
                  <strong>Monto:</strong> ${atencion?.importe}
                </p>
                {atencion.descripcion && (
                  <p>
                    <strong>Descripción:</strong> {atencion?.descripcion}
                  </p>
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
  );
};

export default HistorialAtenciones;
