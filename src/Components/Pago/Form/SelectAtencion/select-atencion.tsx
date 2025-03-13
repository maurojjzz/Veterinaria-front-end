"use client"

import { Autocomplete, TextField, Box, ListItem } from "@mui/material"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import React from "react"

const selectAtenciones = (state) => {
  if (!state || typeof state !== "object") return { atenciones: [] }

  const atencionesState = state.atenciones || {}
  return {
    atenciones: Array.isArray(atencionesState.atenciones) ? atencionesState.atenciones : [],
    loading: Boolean(atencionesState.pending || atencionesState.loading),
    error: atencionesState.error || null,
  }
}

const SelectAtencion = ({ labelText, placeholder, error, register, name, defaultValue, onChange, setValue }) => {
  const { atenciones } = useSelector(selectAtenciones)

  const fieldRegistration = register(name, {
    required: { value: true, message: "Este campo es requerido" },
  })

  const selectedValue =
    defaultValue && defaultValue.id && atenciones && atenciones.some((a) => a.id === defaultValue.id)
      ? defaultValue
      : null

  useEffect(() => {
    if (defaultValue && defaultValue.id) {
      setValue(name, defaultValue.id)
    }
  }, [defaultValue, name, setValue])

  return (
    <Autocomplete
      sx={{ minWidth: "180px", width: "100%" }}
      options={atenciones}
      getOptionLabel={(option) => option?.descripcion || ""}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      value={selectedValue}
      onChange={(event, newValue) => {
        setValue(name, newValue?.id || "")
        onChange(newValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={fieldRegistration.name}
          ref={fieldRegistration.ref}
          onBlur={fieldRegistration.onBlur}
          onChange={(e) => fieldRegistration.onChange(e)}
          label={labelText}
          placeholder={placeholder}
          variant="outlined"
          error={!!error}
          helperText={error || ""}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.id} sx={{ display: "block", padding: "8px 16px", cursor: "pointer" }}>
          <Box>{option.descripcion}</Box>
        </ListItem>
      )}
      noOptionsText="No se encontraron atenciones"
      fullWidth
    />
  )
}

export default SelectAtencion

