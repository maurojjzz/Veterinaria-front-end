import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";

const SexoRadioGroup = ({ register, error }) => {
  return (
    <FormControl component="fieldset" error={!!error} sx={{ 
        marginBottom: "45px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
      <FormLabel component="legend">Sexo</FormLabel>
      <RadioGroup row defaultValue="">
        <FormControlLabel 
          value="Macho" 
          control={<Radio {...register("sexo", { required: "Debe seleccionar el sexo" })} />} 
          label="Macho" 
        />
        <FormControlLabel 
          value="Hembra" 
          control={<Radio {...register("sexo", { required: "Debe seleccionar el sexo" })} />} 
          label="Hembra" 
        />
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SexoRadioGroup;
