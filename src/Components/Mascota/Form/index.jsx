"use client"

import { useEffect, useState, useCallback } from "react"
import styles from "./form-mascota.module.css"

function MascotasForm({ id, onNavigate }) {
  const [formData, setFormData] = useState({
    nombre: "",
    sexo: "",
    fecha_nacimiento: "",
    owner: "",
    raza: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [owners, setOwners] = useState([])
  const [razas, setRazas] = useState([])
  const [errors, setErrors] = useState({})
  const [isLoadingData, setIsLoadingData] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoadingData(true)
    try {
      const baseUrl = process.env.REACT_APP_API_URL || ""

      const [ownersRes, razasRes] = await Promise.all([fetch(`${baseUrl}/api/clientes`), fetch(`${baseUrl}/api/razas`)])

      if (!ownersRes.ok || !razasRes.ok) {
        throw new Error("Error al obtener datos del servidor")
      }

      const [ownersData, razasData] = await Promise.all([ownersRes.json(), razasRes.json()])

      setOwners(ownersData)
      setRazas(razasData)

      if (id) {
        const petRes = await fetch(`${baseUrl}/api/mascotas/${id}`)
        if (!petRes.ok) {
          throw new Error(`Error al obtener mascota: ${petRes.status}`)
        }
        const petData = await petRes.json()
        setFormData({
          nombre: petData.nombre || "",
          sexo: petData.sexo || "",
          fecha_nacimiento: petData.fecha_nacimiento ? petData.fecha_nacimiento.split("T")[0] : "",
          owner: petData.owner?.id || "",
          raza: petData.raza?.id || "",
        })
      }
    } catch (error) {
      console.error("Error en fetchData:", error)
      alert(`Error al cargar los datos: ${error.message}`)
    } finally {
      setIsLoadingData(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido"
    if (!formData.sexo) newErrors.sexo = "El sexo es requerido"
    if (!formData.fecha_nacimiento) newErrors.fecha_nacimiento = "La fecha es requerida"
    if (!formData.owner) newErrors.owner = "El dueño es requerido"
    if (!formData.raza) newErrors.raza = "La raza es requerida"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const baseUrl = process.env.REACT_APP_API_URL || ""
      const response = await fetch(`${baseUrl}/api/mascotas${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          owner_id: formData.owner,
          raza_id: formData.raza,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      alert(`Mascota ${id ? "actualizada" : "creada"} correctamente`)
      onNavigate("table")
    } catch (error) {
      console.error("Error en handleSubmit:", error)
      alert(`Error al ${id ? "actualizar" : "crear"} la mascota: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  if (isLoadingData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>⌛</div>
        <p>Cargando datos...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>{id ? "Editar" : "Nueva"} Mascota</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.nombre ? styles.errorInput : ""}`}
              placeholder="Nombre de la mascota"
            />
            {errors.nombre && <span className={styles.errorMessage}>{errors.nombre}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.sexo ? styles.errorInput : ""}`}
            >
              <option value="">Seleccione el sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            {errors.sexo && <span className={styles.errorMessage}>{errors.sexo}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.fecha_nacimiento ? styles.errorInput : ""}`}
            />
            {errors.fecha_nacimiento && <span className={styles.errorMessage}>{errors.fecha_nacimiento}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Dueño</label>
            <select
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.owner ? styles.errorInput : ""}`}
            >
              <option value="">Seleccione el dueño</option>
              {owners && owners.length > 0 ? (
                owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {`${owner.nombre} ${owner.apellido}`}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No hay dueños disponibles
                </option>
              )}
            </select>
            {errors.owner && <span className={styles.errorMessage}>{errors.owner}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Raza</label>
            <select
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.raza ? styles.errorInput : ""}`}
            >
              <option value="">Seleccione la raza</option>
              {razas && razas.length > 0 ? (
                razas.map((raza) => (
                  <option key={raza.id} value={raza.id}>
                    {raza.descripcion}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No hay razas disponibles
                </option>
              )}
            </select>
            {errors.raza && <span className={styles.errorMessage}>{errors.raza}</span>}
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" onClick={() => onNavigate("table")} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className={styles.submitButton}>
              {isLoading ? <span className={styles.loadingSpinner}>⌛</span> : null}
              {id ? "Actualizar" : "Crear"} Mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MascotasForm


