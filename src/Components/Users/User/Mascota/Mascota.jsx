import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../../Shared";
import { initUsers } from "../../../../redux/users/thunks.js";
import TablaMascota from "./TablaMascota/TablaMascota";
import { decodeToken } from "../../../../Functions/utiities.js";

const Mascota = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [mascotas, setMascotas] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const me = token ? decodeToken(token || localStorage.getItem("token")) : null;

console.log(data);
  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      const user = users.find((user) => user?.id === me?.id);
      setMascotas(user?.mascotas || []);
    }
  }, [me?.id, token, users]);

  useEffect(() => {
    if (mascotas) {
      setData(mascotas);
    }
  }, [mascotas]);

  const handleMascota = () => {
    history.push("/user/mascotas/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/user/mascotas", {});
    }
  }, [location, history]);

  return (
    <Box
      sx={{
        mt: "75px",
        height: "calc(100vh - 75px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "@media (min-width:768px)": {
          mt: "0px",
          marginLeft: "50px",
        },
      }}
    >
      <Typography variant="h4" pt={4} pb={1}>
        Mascotas
      </Typography>
      <Box
        sx={{
          maxWidth: "950px",
          width: "90%",
          mb: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" color="success" onClick={handleMascota}>
          Agregar Mascota
        </Button>
      </Box>
      <Box
        sx={{
          maxWidth: "950px",
          width: "90%",
          height: "80%",
          minHeight: "500px",
          maxHeight: "1000px",
          display: "flex",
        }}
      >
        <TablaMascota data={data} setData={setData} />
      </Box>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </Box>
  );
};

export default Mascota;
