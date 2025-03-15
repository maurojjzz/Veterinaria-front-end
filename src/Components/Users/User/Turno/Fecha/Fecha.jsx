import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Box, Typography } from "@mui/material";

const Fecha = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box
      sx={{
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // gap: 2,
        border: "1px solid red",
        maxWidth: "300px",
        minWidth: "180px",
        width: "90%",
      }}
    >
      <Typography variant="h6">Selecciona una fecha</Typography>
      <Box
        sx={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "center",
          "& .react-date-picker__wrapper": {
            border: "none",
          },
        }}
      >
        <DatePicker
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={new Date()}
        />
      </Box>
    </Box>
  );
};

export default Fecha;
