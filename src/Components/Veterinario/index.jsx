import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./veterinario.module.css";
import TablaVeterinario from "./TablaVeterinario";
import { Toast } from "../Shared";
import { getVet } from "../../redux/veterinarios/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";

const Veterinario = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { veterinarios } = useSelector((state) => state.veterinarios);

  useEffect(() => {
    dispatch(getVet());
  }, [dispatch]);

  useEffect(() => {
    if (veterinarios) {
      setData(veterinarios);
    }
  }, [veterinarios]);

  const handleVeterinario = () => {
    history.push("/admin/veterinarios/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/veterinarios", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <Typography variant="h4" mb={4} ml={2}>
        Veterinarios
      </Typography>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            sx={{ width: "240px", border: "2px solid #1BBCB6", mr: 2 }}
            size="large"
            onClick={() => handleVeterinario()}
            variant="outlined"
            color="info"
          >
            <Typography fontWeight={600} fontSize={15} variant="button" color="#1BBCB6">
              Agregar Veterinario
            </Typography>
          </Button>
        </Box>
        <TablaVeterinario data={data} setData={setData} />
      </div>

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Veterinario;
