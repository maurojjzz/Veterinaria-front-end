"use client"

import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import styles from "./form-pago.module.css"

const PagoForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [pago, setPago] = useState({
    forma_de_pago: "",
    importe: "",
    cuotas: 1,
    nro_cuota: 1,
    atencion: "",
    fecha_hora_pago: new Date().toISOString().slice(0, 16),
  })
  const [atenciones, setAtenciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const atencionesResponse = await axios.get("http://localhost:3080/api/atenciones")
        const atencionesData = Array.isArray(atencionesResponse.data) ? atencionesResponse.data : []
        setAtenciones(atencionesData)

        console.log("Atenciones fetched:", atencionesData)

        if (id) {
          const pagoResponse = await axios.get(`http://localhost:3080/api/pagos/${id}`)
          const pagoData = pagoResponse.data

          console.log("Pago fetched:", pagoData)

          if (pagoData.fecha_hora_pago) {
            const date = new Date(pagoData.fecha_hora_pago)
            pagoData.fecha_hora_pago = date.toISOString().slice(0, 16)
          }

          setPago(pagoData)
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error al cargar los datos. Por favor, intente nuevamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPago({ ...pago, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const pagoToSubmit = {
        ...pago,
        importe: Number.parseFloat(pago.importe),
        cuotas: Number.parseInt(pago.cuotas),
        nro_cuota: Number.parseInt(pago.nro_cuota),
      }

      if (id) {
        await axios.put(`http://localhost:3080/api/pagos/${id}`, pagoToSubmit)
      } else {
        await axios.post("http://localhost:3080/api/pagos", pagoToSubmit)
      }

      history.push("/admin/pagos")
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Error al guardar el pago. Por favor, intente nuevamente.")
    }
  }

  const handleCancel = () => {
    history.push("/admin/pagos")
  }

  const showCuotas = ["Credito", "Debito"].includes(pago.forma_de_pago)

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>{id ? "Editar Pago" : "Agregar Pago"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <form className={styles.pagoForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="forma_de_pago">Forma de Pago</label>
            <select id="forma_de_pago" name="forma_de_pago" value={pago.forma_de_pago} onChange={handleChange} required>
              <option value="">Seleccione una forma de pago</option>
              <option value="Debito">Débito</option>
              <option value="Credito">Crédito</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="importe">Importe</label>
            <input
              id="importe"
              type="number"
              name="importe"
              value={pago.importe}
              onChange={handleChange}
              placeholder="Importe"
              required
            />
          </div>

          {showCuotas && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="cuotas">Cuotas</label>
                <input
                  id="cuotas"
                  type="number"
                  name="cuotas"
                  value={pago.cuotas}
                  onChange={handleChange}
                  placeholder="Cuotas"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nro_cuota">Número de Cuota</label>
                <input
                  id="nro_cuota"
                  type="number"
                  name="nro_cuota"
                  value={pago.nro_cuota}
                  onChange={handleChange}
                  placeholder="Número de Cuota"
                  required
                />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="atencion">Atención</label>
            <select id="atencion" name="atencion" value={pago.atencion} onChange={handleChange} required>
              <option value="">Seleccione una Atención</option>
              {atenciones.map((atencion) => (
                <option key={atencion._id} value={atencion._id}>
                  {atencion.descripcion || atencion.paciente?.nombre || atencion._id}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fecha_hora_pago">Fecha y Hora</label>
            <input
              id="fecha_hora_pago"
              type="datetime-local"
              name="fecha_hora_pago"
              value={pago.fecha_hora_pago}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitBtn}>
              {id ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PagoForm


