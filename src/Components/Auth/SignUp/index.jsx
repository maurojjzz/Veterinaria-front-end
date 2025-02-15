import { Box } from "@mui/material";
import Form from "./Form/Form.jsx"; 

const SignUp = () => {
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection:  "row" ,
        justifyContent: { xs: "center", lg: "space-evenly" },
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          borderRight: 4,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          maxWidth: "50%",
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
          border:"1px solid blue",
          height: "100%",
          // justifyContent: "center",
          // alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default SignUp;


