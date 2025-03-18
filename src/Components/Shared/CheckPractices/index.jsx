import { useEffect, useState } from "react";
import styles from "./checkPractices.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPract } from "../../../redux/practicas/thunks.js";
import { Autocomplete, TextField, Chip } from "@mui/material";

const CheckPractices = ({ register, name, error, labelText, placeholder, setValue, defaultValue }) => {
  const [selectedPrac, setSelectedPract] = useState([]);

  const dispatch = useDispatch();

  const { practicas } = useSelector((state) => state.practicas);

  useEffect(() => {
    dispatch(getPract());
  }, [dispatch]);


  useEffect(() => {
    const initialSelected = practicas.filter((p) => defaultValue?.includes(p.id));
    setSelectedPract(initialSelected);
    setValue(
      name,
      initialSelected.map((p) => p.id)
    );
  }, [defaultValue, practicas, setValue, name]);

  

  const handleChange = (event, newValue) => {
    setSelectedPract(newValue);
    setValue(
      name,
      newValue.map((p) => p.id)
    );

    const newTotalPrice = newValue.reduce((total, practice) => {
      const latestPrice = practice.precios
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0]?.valor; 
      return total + (latestPrice || 0);
    }, 0);
  
    
    setValue("importe", parseFloat(newTotalPrice.toFixed(2)));
  };

  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <input type="hidden" {...register(name)} value={JSON.stringify(selectedPrac.map((p) => p.id))} />

      <Autocomplete
        multiple
        id="tags-standard"
        limitTags={2}
        options={practicas.filter((p) => p.isActive)}
        getOptionLabel={(option) => option.descripcion}
        value={selectedPrac}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={option.id}
              label={option.descripcion}
              {...getTagProps({ index })}
              className={styles.elementPractices}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={labelText}
            placeholder=""
            error={!!error}
            helperText={error}
            sx={{
              mt: "-15px",
              "& .MuiInputBase-root": {
                border: error ? "1px solid #d32f2f" : "1px solid #1BBCB6",
                minHeight: "58px",
                borderRadius: "5px",
                boxShadow: error ? "none" : "10px 7px 15px 0px rgba(27, 188, 182, 0.18)",
                mb: error ? "0px" : "50px",
              },
              "& .MuiInputLabel-root": {
                color: "#1BBCB6",
                marginLeft: "10px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1BBCB6",
              },

              "& .MuiInputLabel-root.Mui-error": {
                color: "#d32f2f",
              },
              "& .MuiInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:before.hover": {
                borderBottom: "none",
              },
              "& .MuiFormHelperText-root": {
                color: error ? "#FF4C4C" : "inherit",
                pt: "10px",
                textAlign: "center",
                height: "45px",
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default CheckPractices;
