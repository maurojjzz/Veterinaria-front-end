"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./pago.module.css"

const Pagos = () => {
  const [pagos, setPagos] = useState([])
  const [atenciones, setAtenciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nuevoPago, setNuevoPago] = useState({
    forma_de_pago: "",
    importe: "",
    cuotas: 1,
    nro_cuota: 1,
    atencion: "",
    fecha_hora_pago: new Date().toISOString().slice(0, 16),
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [pagosResponse, atencionesResponse] = await Promise.all([
          axios.get("http://localhost:3080/api/pagos"),
          axios.get("http://localhost:3080/api/atenciones"),
        ])

        const pagosData = Array.isArray(pagosResponse.data) ? pagosResponse.data : []
        const atencionesData = Array.isArray(atencionesResponse.data) ? atencionesResponse.data : []

        console.log("Pagos fetched:", pagosData)
        console.log("Atenciones fetched:", atencionesData)

        setPagos(pagosData)
        setAtenciones(atencionesData)
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error al cargar los datos. Por favor, intente nuevamente.")
        setPagos([])
        setAtenciones([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3080/api/pagos/${id}`)
      setPagos(pagos.filter((pago) => pago._id !== id))
    } catch (error) {
      console.error("Error al eliminar el pago", error)
      setError("Error al eliminar el pago. Por favor, intente nuevamente.")
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const pagoToCreate = {
        ...nuevoPago,
        importe: Number.parseFloat(nuevoPago.importe),
        cuotas: Number.parseInt(nuevoPago.cuotas),
        nro_cuota: Number.parseInt(nuevoPago.nro_cuota),
      }

      const response = await axios.post("http://localhost:3080/api/pagos", pagoToCreate)

      setPagos([...pagos, response.data])

      setNuevoPago({
        forma_de_pago: "",
        importe: "",
        cuotas: 1,
        nro_cuota: 1,
        atencion: "",
        fecha_hora_pago: new Date().toISOString().slice(0, 16),
      })

      setError(null)
    } catch (error) {
      console.error("Error al crear el pago", error)
      setError("Error al crear el pago. Por favor, intente nuevamente.")
    }
  }

  const showCuotas = ["Credito", "Debito"].includes(nuevoPago.forma_de_pago)

  return (
    <div className={styles.pagosContainer}>
      <h2 className={styles.pagosHeader}>Lista de Pagos</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {pagos.length > 0 ? (
            <div className="table-responsive">
              <table className={styles.pagosTable}>
                <thead>
                  <tr>
                    <th>Forma de Pago</th>
                    <th>Importe</th>
                    <th>Cuotas</th>
                    <th>Nro. Cuota</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago) => (
                    <tr key={pago._id}>
                      <td>{pago.forma_de_pago}</td>
                      <td>${typeof pago.importe === "number" ? pago.importe.toLocaleString() : pago.importe}</td>
                      <td>{pago.cuotas}</td>
                      <td>{pago.nro_cuota}</td>
                      <td>{new Date(pago.fecha_hora_pago).toLocaleString()}</td>
                      <td>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(pago._id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyState}>No hay pagos registrados</div>
          )}

          <h2 className={styles.pagosHeader}>Agregar Pago</h2>
          <form className={styles.pagosForm} onSubmit={handleCreate}>
            <div className={styles.formGroup}>
              <label htmlFor="forma_de_pago">Forma de Pago</label>
              <select
                id="forma_de_pago"
                value={nuevoPago.forma_de_pago}
                onChange={(e) => setNuevoPago({ ...nuevoPago, forma_de_pago: e.target.value })}
                required
              >
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
                placeholder="Importe"
                value={nuevoPago.importe}
                onChange={(e) => setNuevoPago({ ...nuevoPago, importe: e.target.value })}
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
                    placeholder="Cuotas"
                    value={nuevoPago.cuotas}
                    onChange={(e) => setNuevoPago({ ...nuevoPago, cuotas: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="nro_cuota">Número de Cuota</label>
                  <input
                    id="nro_cuota"
                    type="number"
                    placeholder="Número de Cuota"
                    value={nuevoPago.nro_cuota}
                    onChange={(e) => setNuevoPago({ ...nuevoPago, nro_cuota: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="atencion">Atención</label>
              <select
                id="atencion"
                value={nuevoPago.atencion}
                onChange={(e) => setNuevoPago({ ...nuevoPago, atencion: e.target.value })}
                required
              >
                <option value="">Seleccione una atención</option>
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
                value={nuevoPago.fecha_hora_pago}
                onChange={(e) => setNuevoPago({ ...nuevoPago, fecha_hora_pago: e.target.value })}
                required
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn}>
                Agregar Pago
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Pagos







