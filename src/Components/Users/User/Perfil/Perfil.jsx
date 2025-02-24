import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AvatarLetras from "./AvatarLetras";
import Form from "./Form";
import { decodeToken } from "../../../../Functions/utiities.js";
import { LoaderShort } from "../../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "../../../../redux/users/thunks.js";

const Perfil = () => {
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(true);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    try {
      if (users.length > 0) {
        const email = decodeToken(localStorage.getItem("token"))?.email;
        const userLogged = users.find((user) => user.email === email);
        setUser(userLogged);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (users.length > 0) {
        setTimeout(() => {
          setLoad(false);
        }, 2000);
      }
    }
  }, [users]);


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
          border: "1px solid blue",
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
          <AvatarLetras name={user.nombre} surname={user.apellido} />
          <Typography variant="h4" textAlign={"center"}>
            {user.nombre} {user.apellido}
          </Typography>
        </Box>

        <Form dataForm={user} />

        <LoaderShort load={load} />
      </Box>
    </Box>
  );
};

export default Perfil;
