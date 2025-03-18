import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField, Box, ListItem } from "@mui/material";
import { getEspecie } from "../../../../redux/especies/thunks.js";

const SelectEspecie = ({ labelText, placeholder, error, register, name, defaultValue }) => {
  const dispatch = useDispatch();
  const { especies } = useSelector((state) => state.especies);

  useEffect(() => {
    dispatch(getEspecie());
  }, [dispatch]);

  return (
    <Autocomplete
      sx={{
        minWidth: "180px",
        width: "100%",
      }}
      options={especies.filter((esp)=> esp.isActive)}
      getOptionLabel={(option) => option?.descripcion || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={defaultValue}
      renderInput={(params) => (
        <TextField
          {...params}
          {...register(name, { required: { value: true, message: "Este campo es requerido" } })}
          label={labelText}
          placeholder={placeholder}
          variant="outlined"
          error={!!error}
          helperText={error || ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              border: `1px solid ${error ? "#bc331b" : "#1BBCB6"}`,
              boxShadow: error ? "none" : "10px 7px 15px 0px rgba(27, 188, 182, 0.18)",
              "& fieldset": { border: "none" },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              border: `3px solid ${error ? "#bc331b" : "#1BBCB6"}`,
              boxShadow: "0 0 5px rgba(27, 188, 182, 0.5)",
              "& fieldset": { border: "none" },
            },
            "& .MuiInputLabel-root": { color: error ? "#FF4C4C" : "#1BBCB6" },
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.id} sx={{ display: "block", padding: "8px 16px", cursor: "pointer" }}>
          <Box>
            <Box>{option.descripcion}</Box>
          </Box>
        </ListItem>
      )}
      noOptionsText="No se encontraron especies"
      fullWidth
    />
  );
};

export default SelectEspecie;
