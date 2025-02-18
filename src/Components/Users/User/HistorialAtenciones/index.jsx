"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAtenciones } from "../../../../redux/atenciones/thunks.js"
import { decodeToken } from "../../../../Functions/utiities.js"
import styles from "./HistorialAtenciones.module.css"

const HistorialAtenciones = () => {
  const dispatch = useDispatch()
  const { atenciones = [] } = useSelector((state) => state.atenciones)
  const token = useSelector((state) => state.auth.token)
  const usuario = token ? decodeToken(token) : null

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getAtenciones())
  }, [dispatch])

  // Función para sumar un día a una fecha
  const addOneDay = (date) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    return newDate
  }

  // Validar fechas cuando cambian startDate o endDate
  const handleDateChange = (type, value) => {
    const today = new Date() // Fecha actual
    today.setHours(0, 0, 0, 0) // Normalizar la fecha actual a medianoche

    if (type === "start") {
      const newStartDate = value
      const start = newStartDate ? new Date(newStartDate) : null
      const end = endDate ? new Date(endDate) : null

      // Validar si la fecha de inicio es posterior a la fecha actual
      if (start && start > today) {
        setError("No puede haber atenciones que hayan sido realizadas después del presente.")
        setIsModalOpen(true) // Mostrar el modal de advertencia
        return // No actualizar el estado
      }

      // Validar si la fecha de inicio es mayor que la fecha de fin
      if (end && start > end) {
        setError("La fecha de inicio no puede ser posterior a la fecha de fin.")
        setIsModalOpen(true) // Mostrar el modal de advertencia
        return // No actualizar el estado
      }

      setError("")
      setIsModalOpen(false)
      setStartDate(newStartDate) // Actualizar startDate solo si es válida
    } else if (type === "end") {
      const newEndDate = value
      const start = startDate ? new Date(startDate) : null
      const end = newEndDate ? new Date(newEndDate) : null

      // Validar si la fecha de fin es posterior a la fecha actual
      if (end && end > today) {
        setError("No puede haber atenciones que hayan sido realizadas después del presente.")
        setIsModalOpen(true) // Mostrar el modal de advertencia
        return // No actualizar el estado
      }

      // Validar si la fecha de fin es menor que la fecha de inicio
      if (start && end < start) {
        setError("La fecha de fin no puede ser anterior a la fecha de inicio.")
        setIsModalOpen(true) // Mostrar el modal de advertencia
        return // No actualizar el estado
      }

      setError("")
      setIsModalOpen(false)
      setEndDate(newEndDate) // Actualizar endDate solo si es válida
    }
  }

  // Filtrar las atenciones del usuario logueado
  const atencionesUsuario = atenciones.filter((atencion) => atencion.usuario_id === usuario?.id)

  // Filtrar por fecha y ordenar las atenciones
  const atencionesFiltradasYOrdenadas = atencionesUsuario
    .filter((atencion) => {
      const atencionDate = new Date(atencion.fecha_hora_atencion) // Fecha de la atención
      const start = startDate ? new Date(startDate) : null // Fecha de inicio
      const end = endDate ? addOneDay(new Date(endDate)) : null // Fecha de fin (sumamos un día)

      // Comparar fechas
      const isAfterStart = !start || atencionDate >= start
      const isBeforeEnd = !end || atencionDate < end // Usamos "<" porque sumamos un día a endDate

      return isAfterStart && isBeforeEnd
    })
    .sort((a, b) => new Date(b.fecha_hora_atencion).getTime() - new Date(a.fecha_hora_atencion).getTime())

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Historial de Atenciones por Fecha</h1>
      <div className={styles.filterContainer}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          className={styles.dateInput}
        />
        <span className={styles.separator}>a</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange("end", e.target.value)}
          className={styles.dateInput}
        />
      </div>

      {/* Modal de advertencia */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Advertencia</h2>
            <p>{error}</p>
            <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {atencionesFiltradasYOrdenadas.length > 0 ? (
        <div className={styles.grid}>
          {atencionesFiltradasYOrdenadas.map((atencion) => (
            <div key={atencion.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Atención #{atencion.id}</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Fecha de Atención:</strong>{" "}
                  {new Date(atencion.fecha_hora_atencion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Mascota:</strong> {atencion.mascota.nombre}
                </p>
                <p>
                  <strong>Monto:</strong> ${atencion.importe}
                </p>
                {atencion.descripcion && (
                  <p>
                    <strong>Descripción:</strong> {atencion.descripcion}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && <p className={styles.noData}>No hay atenciones registradas en el período seleccionado.</p>
      )}
    </div>
  )
}

export default HistorialAtenciones