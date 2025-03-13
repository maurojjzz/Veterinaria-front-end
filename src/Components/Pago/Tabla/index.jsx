"use client"

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styles from "./tabla-pago.module.css"
import { Toast, ModalAlert } from "../../Shared"
import { useDispatch, useSelector } from "react-redux"
import { getPagos, deletePago } from "../../../redux/pagos/thunks.js"

// Función selectora segura
const selectPagosState = (state) => {
  if (!state || typeof state !== "object") return { pagos: [], loading: false, error: null }

  const pagosState = state.pagos || {}
  return {
    pagos: Array.isArray(pagosState.pagos) ? pagosState.pagos : [],
    loading: Boolean(pagosState.loading),
    error: pagosState.error || null,
  }
}

const TablaPagos = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("")
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [idToEliminate, setIdToEliminate] = useState(null)
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()

  // Uso de la función selectora
  const { pagos, loading: isLoading, error } = useSelector(selectPagosState)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await dispatch(getPagos())
      } catch (err) {
        console.error("Error fetching pagos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  const handleEdit = (pago) => {
    if (!pago || !pago.id) return
    history.push(`/admin/pagos/form/${pago.id}`, { params: { ...pago } })
  }

  const handleDelete = async (id) => {
    if (!id) return

    try {
      await dispatch(deletePago(id))
      setShowToast(true)
      setToastMessage("Pago eliminado correctamente")
      setToastType("Success")
      dispatch(getPagos())
    } catch (error) {
      console.error("Error deleting pago:", error)
      setShowToast(true)
      setToastMessage("Error al eliminar el pago")
      setToastType("Error")
    } finally {
      setShowModalAlert(false)
      setIdToEliminate(null)
    }
  }

  const handleAdd = () => {
    history.push("/admin/pagos/form")
  }

  return (
    <div className={styles.tablaContainer}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Pagos</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          Agregar Nuevo Pago
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading || isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {pagos.length > 0 ? (
            <div className="table-responsive">
              <table className={`table table-hover ${styles.tabla}`}>
                <thead>
                  <tr>
                    <th>Forma de Pago</th>
                    <th>Importe</th>
                    <th>Cuotas</th>
                    <th>Nro Cuota</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago, index) => (
                    <tr key={pago.id || index} className={styles.fila}>
                      <td>{pago.forma_de_pago}</td>
                      <td>${typeof pago.importe === "number" ? pago.importe.toLocaleString() : pago.importe}</td>
                      <td>{pago.cuotas}</td>
                      <td>{pago.nro_cuota}</td>
                      <td>{new Date(pago.fecha_hora_pago).toLocaleString()}</td>
                      <td>
                        <button className={styles.editBtn} onClick={() => handleEdit(pago)}>
                          Editar
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            setIdToEliminate(pago.id)
                            setShowModalAlert(true)
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyState}>
              No hay pagos registrados. Haga clic en "Agregar Nuevo Pago" para crear uno.
            </div>
          )}
        </>
      )}

      <ModalAlert
        text="¿Está seguro que desea eliminar este pago?"
        clickAction={() => idToEliminate && handleDelete(idToEliminate)}
        showModal={showModalAlert}
        setShowModal={setShowModalAlert}
      />

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  )
}

export default TablaPagos




