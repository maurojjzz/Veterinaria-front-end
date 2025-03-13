"use client"

import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getAtenciones } from "../../../redux/atenciones/thunks.js"
import SelectAtencion from "../Form/SelectAtencion/select-atencion.tsx"
import axios from "../../../axios-config.js"
import styles from "./form-pago.module.css"

const selectAtencionesState = (state) => {
  if (!state || typeof state !== "object") return { atenciones: [], pending: false, error: null }

  const atencionesState = state.atenciones || {}
  return {
    atenciones: Array.isArray(atencionesState.atenciones) ? atencionesState.atenciones : [],
    pending: Boolean(atencionesState.pending),
    error: atencionesState.error || null,
  }
}

const PagoForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const { atenciones, pending: atencionesLoading, error: atencionesError } = useSelector(selectAtencionesState)

  const [pago, setPago] = useState({
    forma_de_pago: "",
    importe: "",
    cuotas: 1,
    nro_cuota: 1,
    atencion: "",
    fecha_hora_pago: new Date().toISOString().slice(0, 16),
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAtencion, setSelectedAtencion] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: pago,
  })

  useEffect(() => {
    if (!atenciones || atenciones.length === 0) {
      dispatch(getAtenciones())
    }
  }, [dispatch, atenciones])

  useEffect(() => {
    const fetchPago = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const { data: response } = await axios.get(`/pagos/${id}`)
        if (!response || !response.data) {
          throw new Error("Datos de pago no disponibles")
        }

        const pagoData = response.data

        if (pagoData.fecha_hora_pago) {
          pagoData.fecha_hora_pago = new Date(pagoData.fecha_hora_pago).toISOString().slice(0, 16)
        }

        setPago(pagoData)
        reset(pagoData)

        if (pagoData.atencion && atenciones.length > 0) {
          const atencionSeleccionada = atenciones.find((a) => a.id === pagoData.atencion)
          setSelectedAtencion(atencionSeleccionada || null)
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching pago:", err)
        setError(err.response?.data?.message || "Error al cargar los datos. Por favor, intente nuevamente.")
      } finally {
        setLoading(false)
      }
    }

    if (atenciones.length > 0) {
      fetchPago()
    }
  }, [id, reset, atenciones])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const pagoToSubmit = {
        ...data,
        importe: Number.parseFloat(data.importe),
        cuotas: Number.parseInt(data.cuotas),
        nro_cuota: Number.parseInt(data.nro_cuota),
        atencion: selectedAtencion?.id || data.atencion,
      }

      if (id) {
        await axios.put(`/pagos/${id}`, pagoToSubmit)
      } else {
        await axios.post(`/pagos`, pagoToSubmit)
      }

      history.push("/admin/pagos")
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err.response?.data?.message || "Error al guardar el pago.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleAtencionChange = (newValue) => {
    setSelectedAtencion(newValue)
    if (newValue) {
      setValue("atencion", newValue.id)
    } else {
      setValue("atencion", "")
    }
  }

  if (loading || atencionesLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>{id ? "Editar Pago" : "Agregar Pago"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {atencionesError && <div className="alert alert-danger">{atencionesError}</div>}

      <form className={styles.pagoForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <SelectAtencion
            labelText="Atención"
            placeholder="Seleccione una atención"
            name="atencion"
            register={register}
            error={errors.atencion?.message}
            defaultValue={selectedAtencion}
            onChange={handleAtencionChange}
            setValue={setValue}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="forma_de_pago">Forma de Pago</label>
          <select
            id="forma_de_pago"
            className={styles.formSelect}
            {...register("forma_de_pago", { required: "Este campo es requerido" })}
          >
            <option value="">Seleccione forma de pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>
          {errors.forma_de_pago && <span className={styles.errorMessage}>{errors.forma_de_pago.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="importe">Importe</label>
          <input
            id="importe"
            type="number"
            step="0.01"
            className={styles.formInput}
            {...register("importe", {
              required: "Este campo es requerido",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Ingrese un importe válido",
              },
            })}
          />
          {errors.importe && <span className={styles.errorMessage}>{errors.importe.message}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="cuotas">Cuotas</label>
            <input
              id="cuotas"
              type="number"
              min="1"
              className={styles.formInput}
              {...register("cuotas", {
                required: "Este campo es requerido",
                min: { value: 1, message: "Mínimo 1 cuota" },
              })}
            />
            {errors.cuotas && <span className={styles.errorMessage}>{errors.cuotas.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nro_cuota">Nro. Cuota</label>
            <input
              id="nro_cuota"
              type="number"
              min="1"
              className={styles.formInput}
              {...register("nro_cuota", {
                required: "Este campo es requerido",
                min: { value: 1, message: "Mínimo 1" },
              })}
            />
            {errors.nro_cuota && <span className={styles.errorMessage}>{errors.nro_cuota.message}</span>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fecha_hora_pago">Fecha y Hora</label>
          <input
            id="fecha_hora_pago"
            type="datetime-local"
            className={styles.formInput}
            {...register("fecha_hora_pago", {
              required: "Este campo es requerido",
            })}
          />
          {errors.fecha_hora_pago && <span className={styles.errorMessage}>{errors.fecha_hora_pago.message}</span>}
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={() => history.push("/admin/pagos")}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? (id ? "Actualizando..." : "Guardando...") : id ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PagoForm





