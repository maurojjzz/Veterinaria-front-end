"use client"

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styles from "./tabla-pago.module.css"
import { Toast, ModalAlert } from "../../Shared"
import { useDispatch, useSelector } from "react-redux"
import { getPagos, deletePago } from "../../../redux/pagos/thunks.js"

const TablaPagos = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("")
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [idToEliminate, setIdToEliminate] = useState(null)
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()

  // Get pagos from Redux store and ensure it's an array
  const pagosState = useSelector((state) => state.pagos)
  const pagos = Array.isArray(pagosState.pagos) ? pagosState.pagos : []
  const isLoading = pagosState.loading
  const error = pagosState.error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await dispatch(getPagos())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  const handleEdit = (pago) => {
    history.push(`/admin/pagos/form/${pago.id}`, { params: { ...pago } })
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePago(id))
      setShowToast(true)
      setToastMessage("Pago eliminado correctamente")
      setToastType("Success")
      dispatch(getPagos())
    } catch (error) {
      setShowToast(true)
      setToastMessage("Error al eliminar el pago")
      setToastType("Error")
    } finally {
      setShowModalAlert(false)
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
                    <tr key={index} className={styles.fila}>
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
        clickAction={() => handleDelete(idToEliminate)}
        showModal={showModalAlert}
        setShowModal={setShowModalAlert}
      />

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  )
}

export default TablaPagos



