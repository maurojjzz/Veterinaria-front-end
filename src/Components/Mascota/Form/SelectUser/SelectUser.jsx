import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField, Box, ListItem } from "@mui/material";
import { initUsers } from "../../../../redux/users/thunks.js";

const SelectUser = ({ labelText, placeholder, error, register, name, defaultValue }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
      if (defaultValue) {
        const s_usu = users.find((u) => u.id === defaultValue);
        if (s_usu) {
          setSelectedUser(s_usu);
        } else{
          setSelectedUser(null)
        }
      }
    }, [defaultValue, users]);

  return (
    <Autocomplete
      options={users.filter((u) => u.isActive)}
      getOptionLabel={(option) => option?.email || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedUser}
      onChange={(event, newValue) => setSelectedUser(newValue)}
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
            <Box sx={{ fontWeight: "bold" }}>{option.email}</Box>
            <Box sx={{ color: "text.secondary" }}>
              {option.nombre} {option.apellido}
            </Box>
            <Box>
              <strong>DNI:</strong> {option.nro_doc}
            </Box>
          </Box>
        </ListItem>
      )}
      noOptionsText="No se encontraron usuarios"
      fullWidth
    />
  );
};

export default SelectUser;
