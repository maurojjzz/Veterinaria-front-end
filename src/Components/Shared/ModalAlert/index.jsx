import { useState } from "react";
import { Box, Modal, Typography, useTheme, Button } from "@mui/material";
const ModalAlert = ({ text = "¿Estas seguro de seguir con la operacion?", clickAction = () => {} }) => {
  const [abrir, setAbrir] = useState(true);

  const theme = useTheme();

  const styleButton = {
    width: {
      xs: "180px",
      m_sm: "130px",
    },
    height: "40px",
    borderRadius: "3px",
    fontWeight: "600",
    fontSize: "16px",
  };

  return (
    <Modal
      open={abrir}
      onClose={() => {}}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.whiteCard.main,
          minHeight: "220px",
          minWidth: "290px",
          maxWidth: "500px",
          width: "80%",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Box
          sx={{
            // border: "1px solid red",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            pt: "5px",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/information.png`}
            alt="info icon"
            // style={
            //   {
            //     // border: "1px solid red",
            //   }
            // }
          />
        </Box>
        <Box
          sx={{
            // border: "1px solid red",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "18px",
              textAlign: "center",
              overflowWrap: "break-word",
              lineHeight: "25px",
              fontWeight: "600",
              py: "10px",
            }}
          >
            {text}
          </Typography>
          <Box
            sx={{
              mt: "auto",
              pt: "10px",
              pb: "20px",
              // border: "1px solid red",
              display: "flex",
              flexDirection: {
                xs: "column",
                m_sm: "row",
              },
              gap: "10px",
              pr: {
                m_sm: "10px",
              },
              justifyContent: {
                xs: "center",
                m_sm: "flex-end",
              },
              alignItems: "center",
            }}
          >
            <Button variant="contained" sx={styleButton} color="success" onClick={clickAction}>
              Aceptar
            </Button>
            <Button variant="outlined" sx={styleButton} color="error" onClick={() => setAbrir(false)}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAlert;
