import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, TextField } from "@mui/material";
import { getMascotas } from "../../../../../redux/mascotas/thunks.js";
import { decodeToken } from "../../../../../Functions/utiities.js";

const SelectPet = ({onPetSelect}) => {
  const dispatch = useDispatch();

  const { mascotas } = useSelector((state) => state.mascotas);

  const id = decodeToken(localStorage.getItem("token"))?.id;

  useEffect(() => {
    dispatch(getMascotas());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    onPetSelect(newValue);
  };

  return (
    <Box sx={{ width: "200px" }} className="d-flex flex-column mb-3">
      <Autocomplete
        disablePortal
        id="autocomplete-pet"
        options={mascotas?.filter((pet) => pet.isActive && pet?.owner?.id === id) || []}
        getOptionLabel={(option) => option.nombre || ""}
        renderInput={(params) => <TextField {...params} label="Mascota" />}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nombre}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SelectPet;
