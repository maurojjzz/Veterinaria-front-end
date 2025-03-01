import { useState, useEffect } from "react";
import { Box, Autocomplete, TextField, ListItem } from "@mui/material";
import { getEspecie } from "../../../../redux/especies/thunks.js";
import { useDispatch, useSelector } from "react-redux";

const SelectRaza = ({ onChangeEspecie, onChangeRaza, errorRaza, register }) => {
  const [selectedEspecie, setSelectedEspecie] = useState(null);
  const [selectedRaza, setSelectedRaza] = useState(null);
  const [razasFiltradas, setRazasFiltradas] = useState([]);

  const dispatch = useDispatch();
  const { especies } = useSelector((state) => state.especies);

  useEffect(() => {
    dispatch(getEspecie());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEspecie) {
      setRazasFiltradas(selectedEspecie.razas);
    } else {
      setRazasFiltradas([]);
      setSelectedRaza(null);
    }
  }, [selectedEspecie]);

  const textFieldStyles = (error) => ({
    "& .MuiOutlinedInput-root": {
      marginBottom: !error ? "45px" : "0px",
      border: `1px solid ${error ? "#bc331b" : "#1BBCB6"}`,
      boxShadow: error ? "none" : "10px 7px 15px 0px rgba(27, 188, 182, 0.18)",
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      border: `3px solid ${error ? "#bc331b" : "#1BBCB6"}`,
      boxShadow: "0 0 5px rgba(27, 188, 182, 0.5)",
      outline: "none",
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiFormHelperText-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "45px",
    },
    "& .MuiInputLabel-root": {
      color: error ? "#FF4C4C" : "#1BBCB6",
      backgroundColor: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: error ? "#FF4C4C" : "#1BBCB6",
    },
  });

  return (
    <Box
      {...register("raza", { required: { value: true, message: "Este campo es requerido" } })}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Autocomplete
        options={especies}
        getOptionLabel={(option) => option.descripcion}
        value={selectedEspecie}
        onChange={(event, newValue) => {
          setSelectedEspecie(newValue);
          setSelectedRaza(null);
          onChangeEspecie && onChangeEspecie(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Especie"
            placeholder="Selecciona una especie"
            variant="outlined"
            error={!!errorRaza}
            helperText={errorRaza || ""}
            sx={textFieldStyles(errorRaza)}
          />
        )}
        fullWidth
      />

      <Autocomplete
        options={razasFiltradas}
        getOptionLabel={(option) => option.descripcion}
        value={selectedRaza}
        onChange={(event, newValue) => {
          setSelectedRaza(newValue);
          onChangeRaza && onChangeRaza(newValue);
        }}
        disabled={!selectedEspecie}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Raza"
            placeholder="Selecciona una raza"
            variant="outlined"
            error={!!errorRaza}
            helperText={errorRaza || ""}
            sx={textFieldStyles(errorRaza)}
          />
        )}
        renderOption={(props, option) => (
          <ListItem
            {...props}
            key={option.id}
            sx={{ display: "block", borderBottom: "1px solid #e0e0e0", padding: "8px 16px", cursor: "pointer" }}
          >
            <Box>
              <Box sx={{ marginBottom: "4px" }}>{option.descripcion}</Box>
            </Box>
          </ListItem>
        )}
        noOptionsText="No se encontraron razas"
        fullWidth
      />
    </Box>
  );
};

export default SelectRaza;
