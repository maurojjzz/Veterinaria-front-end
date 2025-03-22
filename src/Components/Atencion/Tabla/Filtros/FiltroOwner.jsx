import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, TextField } from "@mui/material";
import { initUsers } from "../../../../redux/users/thunks.js";

const FiltroOwner = ({onSelectOwner}) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    onSelectOwner(newValue);
  };

  return (
    <Box sx={{ width: "200px" }}>
      <Autocomplete
        size="small"
        disablePortal
        id="autocomplete-pet"
        options={users?.filter((use) => use.isActive ) || []}
        getOptionLabel={(option) => `${option.nombre} ${option.apellido}` || ""}
        renderInput={(params) => <TextField  {...params} label="Dueño" />}
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

export default FiltroOwner;
