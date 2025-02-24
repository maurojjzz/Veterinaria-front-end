import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AvatarLetras from "./AvatarLetras";
import { decodeToken } from "../../../../Functions/utiities.js";

const Perfil = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(decodeToken(localStorage.getItem("token"))?.name);
  }, [user]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 75px)",
        border: "3px solid red",
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

          }}
        >
          <AvatarLetras user={user} />
          <Typography variant="h4">{user}</Typography>
        </Box>

        <Box component={`form`}>El formu aca</Box>
      </Box>
    </Box>
  );
};

export default Perfil;
