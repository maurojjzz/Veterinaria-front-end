import { Box, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decodeToken } from "../../../../../Functions/utiities.js";
import { useEffect, useState } from "react";
import { initUsers } from "../../../../../redux/users/thunks.js";
import { LoaderShort } from "../../../../Shared";

const BloqueoMascota = () => {
  const [token, setToken] = useState("");
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const me = token ? decodeToken(token || localStorage.getItem("token")) : null;


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
      setLoading(false);
    }
  }, [me?.id, token, users]);

  if (mascotas.length !== 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "75px",
        left: "0",
        width: "100%",
        height: "calc(100vh - 75px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(90, 94, 89, 0.94)",
        "@media (min-width:768px)": {
          marginLeft: "50px",
          width: "calc(100% - 50px)",
        },
      }}
    >
      <Typography
        variant="h3"
        component={"p"}
        textAlign={"center"}
        sx={{
          color: "white",
        }}
      >
        Para acceder a los servicios debes tener asociado una mascota
      </Typography>

      <Box
        sx={{
          width: "80%",
          maxWidth: "630px",
          display: "flex",
          justifyContent: "center",
          "& img": {
            width: "100%",
          },
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/images/bunchofpets.png`} alt="Foto veterinaria animada" />
      </Box>

      <Button
        onClick={() => history.push("/user/mascotas")}
        variant="contained"
        sx={{
          marginTop: "20px",
          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <Typography variant="h5">Agregar Mascota</Typography>
      </Button>
      <LoaderShort load={loading} />
    </Box>
  );
};

export default BloqueoMascota;
