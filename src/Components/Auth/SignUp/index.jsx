import { Box, useTheme } from "@mui/material";
import Form from "./Form/Form.jsx"; 
// import theme from "../../../themes/theme.js";

const SignUp = () => {
 
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection:  "row" ,
        justifyContent: { xs: "center", lg: "space-evenly" },
        alignItems: "center",
        minHeight: "100vh",
      }}
    >

      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          maxWidth: "45%",
        }}
      >
        <Box sx={{ maxWidth: "85%" }}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Veterinary-rafiki.png`}
            alt="Foto veterinaria animada"
            style={{ width: "100%" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          borderLeft:`3px solid #dfe3e6`,
          height: "100vh",
          flexGrow: 1,
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default SignUp;