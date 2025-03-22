import { useState } from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FiltrosClientes = ({ onFilter }) => {
  const [filtro, setFiltro] = useState("email");
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
    <Box display="flex" gap={2} alignItems="center" 
        sx={{ 
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap", 
            mb: 2       
        }}
    >
      <FormControl size="small" sx={{ minWidth: 223, }}>
        <InputLabel>Filtrar por</InputLabel>
        <Select value={filtro} onChange={handleFilterChange}>
          <MenuItem value="email" >Email</MenuItem>
          <MenuItem value="nombre">Nombre</MenuItem>
          <MenuItem value="nro_doc">DNI</MenuItem>
          <MenuItem value="telefono">Teléfono</MenuItem>
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

export default FiltrosClientes;
