import React, { useEffect, useState } from "react";
import styles from "./select-user.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField, Box, ListItem } from "@mui/material";
import { initUsers } from "../../../redux/users/thunks.js";

const SelectUser = ({ labelText, placeholder, type, register, name, error, setUserPet, setValue, defaultValue }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  console.log(defaultValue);

  console.log(users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    if (defaultValue) {
      const s_usu = users.find((u) => u.id === defaultValue);
      if (s_usu) {
        setSelectedUser(s_usu);
        setUserPet(s_usu);
      }
    }
  }, [defaultValue, users, setUserPet]);

  const handleChange = (event, newValue) => {
    setSelectedUser(newValue);
    if (newValue) {
      setUserPet(newValue);
      setValue(name, newValue.id);
    }
  };

  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <Autocomplete
        options={users}
        getOptionLabel={(option) => option?.email || ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={selectedUser}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register(name, { required: { value: true, message: "Este campo es requerido" } })}
            error={!!error}
            helperText={error || ""}
            label={labelText}
            placeholder={placeholder}
            variant="outlined"
            autoComplete="off"
            sx={{
              mt: "-10px",
              "& .MuiOutlinedInput-root": {
                border: `1px solid ${error ? "#bc331b" : "#1BBCB6"}`,
                boxShadow: error ? "none" : "10px 7px 15px 0px rgba(27, 188, 182, 0.18)",
                mb: error ? "0px" : "50px",
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
            sx={{ display: "block", borderBottom: "1px solid #e0e0e0", padding: "8px 16px", cursor: "pointer" }}
          >
            <Box>
              <Box sx={{ fontWeight: "bold", marginBottom: "4px" }}>{option.email}</Box>
              <Box sx={{ color: "text.secondary", marginBottom: "4px" }}>
                {option.nombre} {option.apellido}
              </Box>
              <Box>
                <strong>DNI:</strong> {option.nro_doc}
              </Box>
            </Box>
          </ListItem>
        )}
        noOptionsText="No se encontraron usuarios"
        disablePortal
        fullWidth
      />
    </div>
  );
};

export default SelectUser;
