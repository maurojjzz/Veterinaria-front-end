import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, TextField } from "@mui/material";
import { getVet } from "../../../../../../redux/veterinarios/thunks.js";

const FiltroVet = ({onSelectVet}) => {
  const dispatch = useDispatch();

  const { veterinarios } = useSelector((state) => state.veterinarios);

  useEffect(() => {
    dispatch(getVet());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    onSelectVet(newValue);
  };

  return (
    <Box sx={{ width: "200px" }}>
      <Autocomplete
        size="small"
        disablePortal
        id="autocomplete-pet"
        options={veterinarios?.filter((vet) => vet.isActive ) || []}
        getOptionLabel={(option) => `${option.nombre} ${option.apellido}` || ""}
        renderInput={(params) => <TextField  {...params} label="Veterinario" />}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nombre} {option.apellido}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={handleChange}
      />
    </Box>
  );
};

export default FiltroVet;
