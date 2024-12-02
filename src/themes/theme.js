import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#252F48",
    },
    secondary: {
      main: "#A9C3B8",
    },
    whiteCard:{
      main: "#FDFDFE",
    }
  },
  breakpoints: {
    values: {
      xs: 0,     
      sm: 600,   
      md: 900,   
      lg: 1200,  
      xl: 1536,  
      m_sm: 460 
    },
  },
});

export default theme;
