import React, { useEffect, useState } from "react";
import styles from "./select_vet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getVet } from "../../../redux/veterinarios/thunks.js";
import { Autocomplete, TextField, Box, ListItem } from "@mui/material";

const SelectVet = ({ labelText, placeholder, type, register, name, error, setValue, defaultValue }) => {

  const [selectedVet, setSelectedVet] = useState(null);

  const dispatch = useDispatch();

  const { veterinarios } = useSelector((state) => state.veterinarios);

  useEffect(() => {
    dispatch(getVet());
  }, [dispatch]);

  useEffect(() => {
    if (defaultValue) {
      const selected = veterinarios.find((v) => v.id === defaultValue);
      if (selected) {
        setSelectedVet(selected);
        setValue(name, selected.id);
      }
    }
  }, [defaultValue, name, setValue, veterinarios]);

  const handleChange = (event, newValue) => {
    setSelectedVet(newValue);
    if (newValue) {
      setValue(name, newValue.id );
    }
  };

  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <Autocomplete
        options={veterinarios.filter((v) => v.isActive)}
        getOptionLabel={(option) => option?.email || ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={selectedVet}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register(name, { required: { value: true, message: "Este campo es requerido" } })}
            error={!!error}
            helperText={error || ""}
            label={labelText}
            placeholder={placeholder}
            autoComplete="off"
            sx={{
              mt: "-10px",
              "& .MuiOutlinedInput-root": {
                border: `1px solid ${error ? "#FF4C4C" : "#1BBCB6"}`,
                boxShadow: error ? "none" : "10px 7px 15px 0px rgba(27, 188, 182, 0.18)",
                mb: error ? "0px" : "50px",
                "& fieldset": { border: "none" },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                border: `3px solid ${error ? "#FF4C4C" : "#1BBCB6"}`,
                outline: "none",
              },
              "& .MuiFormHelperText-root": {
                color: error ? "#FF4C4C" : "inherit",
                pt: "10px",
                textAlign: "center",
                height: "45px",
              },
              "& .MuiInputLabel-root": {
                color: error ? "#FF4C4C" : "#1BBCB6",
                backgroundColor: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: error ? "#FF4C4C" : "#1BBCB6",
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <ListItem
            {...props}
            key={option.id}
            sx={{
              display: "block",
              borderBottom: "1px solid #e0e0e0",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            <Box>
              <Box sx={{ fontWeight: "bold", marginBottom: "4px" }}>{option.email}</Box>
              <Box sx={{ color: "text.secondary", marginBottom: "4px" }}>
                {option.nombre} {option.apellido}
              </Box>
              <Box>
                <strong>Matrícula:</strong> {option.matricula}
              </Box>
            </Box>
          </ListItem>
        )}
        noOptionsText="No se encontraron veterinarios"
        disablePortal
        fullWidth
      />
    </div>
  );
};

export default SelectVet;
