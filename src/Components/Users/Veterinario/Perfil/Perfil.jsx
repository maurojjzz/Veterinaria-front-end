import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import AvatarLetras from "./AvatarLetras";
import Form from "./Form";
import Password from "./Password/Password.jsx";
import { decodeToken } from "../../../../Functions/utiities.js";
import { LoaderShort, Toast } from "../../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { getVet } from "../../../../redux/veterinarios/thunks.js";

const Perfil = () => {
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { veterinarios } = useSelector((state) => state.veterinarios);

  useEffect(() => {
    dispatch(getVet());
  }, [dispatch]);

  useEffect(() => {
    try {
      if (veterinarios.length > 0) {
        const email = decodeToken(localStorage.getItem("token"))?.email;
        const userLogged = veterinarios.find((user) => user.email === email);
        setUser(userLogged);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (veterinarios.length > 0) {
        setTimeout(() => {
          setLoad(false);
        }, 2000);
      }
    }
  }, [veterinarios]);

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/vet/perfil", {});
    }
  }, [location, history]);

  useEffect(() => {
    if (password) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [password]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 75px)",
        "@media (max-width: 776px)": {
          marginTop: "75px",
        },
        "@media (min-width: 768px)": {
          paddingLeft: "50px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          <AvatarLetras name={user?.nombre} surname={user?.apellido} />
          <Typography variant="h4" textAlign={"center"}>
            {user?.nombre} {user?.apellido}
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            maxWidth: "750px",
            paddingRight: { xs: "0px", md: "50px" },
          }}
        >
          <Button variant="outlined" color="success" endIcon={<KeyIcon />} onClick={() => setPassword(true)}>
            Cambiar contraseña
          </Button>
        </Box>

        <Form dataForm={user} setLoad={setLoad} />

        <LoaderShort load={load} />
        {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
      </Box>
      {password && <Password setPassword={setPassword} id={user.id} />}
    </Box>
  );
};

export default Perfil;
