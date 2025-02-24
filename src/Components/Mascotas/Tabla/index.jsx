"use client"

import { useEffect, useState, useCallback } from "react"
import styles from "./tabla-mascotas.module.css"

function MascotasTable({ onNavigate }) {
  const [pets, setPets] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [petToDelete, setPetToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPets = useCallback(async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL || ""
      const response = await fetch(`${baseUrl}/api/mascotas`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setPets(data)
    } catch (error) {
      console.error("Error al cargar mascotas:", error)
      alert("No se pudieron cargar las mascotas")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  const handleEdit = (id) => {
    onNavigate("form", id)
  }

  const handleDelete = async () => {
    if (!petToDelete) return

    try {
      const baseUrl = process.env.REACT_APP_API_URL || ""
      const response = await fetch(`${baseUrl}/api/mascotas/${petToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      alert("Mascota eliminada correctamente")
      await fetchPets()
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("No se pudo eliminar la mascota")
    } finally {
      setDeleteDialogOpen(false)
      setPetToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>⌛</div>
        <p>Cargando mascotas...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mascotas</h2>
        <button onClick={() => onNavigate("form")} className={styles.newButton}>
          Agregar Mascota
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableCell}>Nombre</th>
              <th className={styles.tableCell}>Sexo</th>
              <th className={`${styles.tableCell} ${styles.hiddenMobile}`}>Fecha Nacimiento</th>
              <th className={styles.tableCell}>Dueño</th>
              <th className={`${styles.tableCell} ${styles.hiddenMobile}`}>Raza</th>
              <th className={`${styles.tableCell} ${styles.actionsCell}`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className={styles.tableRow}>
                <td className={`${styles.tableCell} ${styles.bold}`}>{pet.nombre}</td>
                <td className={styles.tableCell}>{pet.sexo}</td>
                <td className={`${styles.tableCell} ${styles.hiddenMobile}`}>
                  {new Date(pet.fecha_nacimiento).toLocaleDateString()}
                </td>
                <td className={styles.tableCell}>{`${pet.owner.nombre} ${pet.owner.apellido}`}</td>
                <td className={`${styles.tableCell} ${styles.hiddenMobile}`}>{pet.raza.descripcion}</td>
                <td className={styles.tableCell}>
                  <div className={styles.actionsContainer}>
                    <button
                      onClick={() => handleEdit(pet.id)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        setPetToDelete(pet.id)
                        setDeleteDialogOpen(true)
                      }}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteDialogOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>¿Está seguro?</h3>
            <p className={styles.modalText}>
              Esta acción no se puede deshacer. Se eliminará permanentemente la mascota.
            </p>
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteDialogOpen(false)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MascotasTable




