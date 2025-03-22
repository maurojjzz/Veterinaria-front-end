import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cliente.module.css";
import TablaCliente from "./Table";
import { initUsers } from "../../redux/users/thunks.js";
import { Toast } from "../Shared";
import { Typography, Box, Button } from "@mui/material";

const Cliente = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { users, pending, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  useEffect(() => {
    if (!pending && error) {
      if (error === "access denied, token expired or incorrect") {
        setToastMessage("Sesion expirada");
      } else {
        setToastMessage(error);
      }
      setToastType("Error");
      setShowToast(true);
    }
  }, [error, pending]);

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/usuarios", {});
    }
  }, [location, history]);

  const handleUser = () => {
    history.push("/admin/usuarios/form");
  };

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <Typography variant="h4" mb={4} ml={2}>
        Usuarios
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          sx={{ width: "230px", border: "2px solid #1BBCB6", mr: 2 }}
          size="large"
          onClick={() => handleUser()}
          variant="outlined"
          color="info"
        >
          <Typography fontWeight={600} fontSize={16} variant="button" color="#1BBCB6">
            Agregar Usuario
          </Typography>
        </Button>
      </Box>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <TablaCliente data={data} setData={setData} />
      </div>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Cliente;
