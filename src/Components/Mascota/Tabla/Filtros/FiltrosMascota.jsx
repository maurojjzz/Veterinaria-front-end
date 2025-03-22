import { useState } from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FiltrosMascota = ({ onFilter }) => {
  const [filtro, setFiltro] = useState("nombre");
  const [valor, setValor] = useState("");

  const handleFilterChange = (event) => {
    setFiltro(event.target.value);
    setValor("");
  };

  const handleInputChange = (event) => {
    setValor(event.target.value);
    onFilter(event.target.value, filtro);
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        mb: 2,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 223 }}>
        <InputLabel>Filtrar por</InputLabel>
        <Select value={filtro} onChange={handleFilterChange}>
          <MenuItem value="nombre">Nombre Mascota</MenuItem>
          <MenuItem value="especie">Especie</MenuItem>
          <MenuItem value="dueño">Nombre Dueño</MenuItem>
          <MenuItem value="email dueño">Email Dueño</MenuItem>
        </Select>
      </FormControl>

      <TextField
        size="small"
        label={`Buscar por ${filtro}`}
        variant="outlined"
        value={valor}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default FiltrosMascota;
