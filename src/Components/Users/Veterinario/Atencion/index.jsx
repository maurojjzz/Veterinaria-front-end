import styles from "./atencion.module.css";
import { useHistory, useLocation } from "react-router-dom";
import TablaAtencion from "./Tabla";
import { useEffect, useState } from "react";
import { Toast } from "../../../Shared";
import { Button, Typography, Box } from "@mui/material";

const Atencion = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();

  const location = useLocation();

  const handleAtencion = () => {
    history.push("/vet/atenciones/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/vet/atenciones", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <Typography variant="h4" mb={4} ml={2}>
        Atenciones
      </Typography>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            sx={{ width: "230px", border: "2px solid #1BBCB6", mr: 2 }}
            size="large"
            onClick={() => handleAtencion()}
            variant="outlined"
            color="info"
          >
            <Typography fontWeight={600} fontSize={16} variant="button" color="#1BBCB6">
              Agregar Atencion
            </Typography>
          </Button>
        </Box>
        <TablaAtencion />
      </div>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Atencion;
