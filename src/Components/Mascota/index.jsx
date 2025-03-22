import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./mascota.module.css";
import MascotasTable from "./Tabla";
import { Toast } from "../Shared";
import { getMascotas } from "../../redux/mascotas/thunks.js";
import { getEspecie } from "../../redux/especies/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";

const Mascotas = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { mascotas } = useSelector((state) => state.mascotas);
  const { especies } = useSelector((state) => state.especies);

  useEffect(() => {
    dispatch(getMascotas());
    dispatch(getEspecie());
  }, [dispatch]);

  useEffect(() => {
    if (mascotas) {
      setData(mascotas);
    }
  }, [mascotas]);

  const handleMascota = () => {
    history.push("/admin/mascota/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/mascota", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1  ${styles.clienteContainer}`}>
      <Typography variant="h4" mb={4} ml={2}>
        Mascotas
      </Typography>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            sx={{ width: "230px", border: "2px solid #1BBCB6", mr: 2 }}
            size="large"
            onClick={() => handleMascota()}
            variant="outlined"
            color="info"
          >
            <Typography fontWeight={600} fontSize={16} variant="button" color="#1BBCB6">
              Agregar Mascota
            </Typography>
          </Button>
        </Box>
        <MascotasTable data={data} setData={setData} especies={especies} />
      </div>

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Mascotas;
