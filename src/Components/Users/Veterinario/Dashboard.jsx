import { Box } from "@mui/material";
import Calendario from "./Calendario/Calendario";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "75px",
        width: "100%",
        height: "calc(100vh - 75px)",

        "@media (min-width:768px)": {
          height: "auto",
          paddingLeft: "40px",  
        },
       
      }}
    >
      <Calendario />
    </Box>
  )
}

export default Dashboard
