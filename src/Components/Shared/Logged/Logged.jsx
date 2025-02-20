import { Box, useTheme, Typography, Button } from "@mui/material";
import { logout } from "../../../redux/auth/thunks.js";
import { useDispatch } from "react-redux";

const Logged = ({ setLogged }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        border: "1px solid red",
        backgroundColor: "rgba(150, 148, 148, 0.57)",
        zIndex: "5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "90%",
          maxWidth: "500px",
          minWidth: "250px",
          height: "250px",
          backgroundColor: theme.palette.whiteCard.main,
          borderRadius: "10px",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: { md: "-80px" },
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" textAlign={"center"}>
          Para acceder a esta seccion debes cerrar sesion
        </Typography>

        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "80%",
            height: "40px",
          }}
          onClick={async () => {
            await dispatch(logout());
            setLogged(false);
          }}
        >
          <Typography variant="h6">Cerrar Sesion</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Logged;
