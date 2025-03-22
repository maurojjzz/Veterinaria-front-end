import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./practica.module.css";
import { Toast } from "../Shared";
import TablaPracticas from "./Tabla";
import { getPract } from "../../redux/practicas/thunks.js";
import { Typography, Box, Button } from "@mui/material";

const Practica = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { practicas } = useSelector((state) => state.practicas);

  useEffect(() => {
    dispatch(getPract());
  }, [dispatch]);

  useEffect(() => {
    if (practicas) {
      setData(practicas);
    }
  }, [practicas]);

  const handlePractica = () => {
    history.push("/admin/practicas/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/practicas", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <Typography variant="h4" mb={4} ml={2}>
        Practicas
      </Typography>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            sx={{ width: "230px", border: "2px solid #1BBCB6", mr: 2 }}
            size="large"
            onClick={() => handlePractica()}
            variant="outlined"
            color="info"
          >
            <Typography fontWeight={600} fontSize={16} variant="button" color="#1BBCB6">
              Agregar Practica
            </Typography>
          </Button>
        </Box>
        <TablaPracticas data={data} setData={setData} />
      </div>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Practica;
