import { Box, TextField } from "@mui/material";

const FechaFiltro = ({ startDate, endDate, handleDateChange }) => {
  return (
    <Box display="flex" flexWrap={"wrap"} justifyContent="center" alignItems="center" gap={1}>
      <TextField
        label="Desde"
        type="date"
        size="small"
        value={startDate}
        inputProps={{ max: endDate }}
        onChange={(e) => handleDateChange("start", e.target.value)}
        InputLabelProps={{ shrink: true }}
        onMouseDown={(e) => {
          e.preventDefault();
          if (e.target.showPicker) e.target.showPicker();
        }}
      />
      <TextField
        label="Hasta"
        type="date"
        size="small"
        value={endDate}
        inputProps={{ min: startDate }}
        onChange={(e) => handleDateChange("end", e.target.value)}
        InputLabelProps={{ shrink: true }}
        onFocus={(e) => (e.target.showPicker ? e.target.showPicker() : null)}
      />
    </Box>
  );
};

export default FechaFiltro;
