import { useEffect, useState } from "react";
import styles from "./pago.module.css";
import { getPagos, deletePago } from "../../redux/pagos/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Shared/Toast";

const Pagos = () => {
  const [loading, setLoading] = useState(true);
  const [pagosLista, setPagosLista] = useState([]);
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
  const { pagos } = useSelector((state) => state.pagos);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        setLoading(true);
        await dispatch(getPagos());
      } catch (error) {
        console.error(error);
        setToast({ title: "Error", message: "Error al obtener los pagos", setError: setToast });
      } finally {
        setLoading(false);
      }
    };
    fetchPagos();
  }, [dispatch]);

  useEffect(() => {
    setPagosLista(pagos.filter((pago) => pago?.atencion && typeof pago?.atencion === "object"));
  }, [pagos]);

  const handleDeletePago = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este pago?")) return;
    
    try {
      setLoading(true);
      await dispatch(deletePago(id));
      setToast({ title: "Success", message: "Pago eliminado correctamente", setError: setToast });
    } catch (error) {
      console.error(error);
      setToast({ title: "Error", message: "Error al eliminar el pago", setError: setToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pagosContainer}>
      <h2 className={styles.pagosHeader}>Lista de Pagos</h2>
      {toast && <Toast {...toast} />}
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {pagosLista.length > 0 ? (
            <div className="table-responsive">
              <table className={styles.pagosTable}>
                <thead>
                  <tr>
                    <th>Atención</th>
                    <th>Forma de Pago</th>
                    <th>Importe</th>
                    <th>Cuotas</th>
                    <th>Nro. Cuota</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagosLista.map((pago) => (
                    <tr key={pago.id}>
                      <td>{pago?.atencion?.id}</td>
                      <td>{pago?.forma_de_pago}</td>
                      <td>
                        ${" "}
                        {typeof pago.importe === "number"
                          ? pago?.importe.toLocaleString()
                          : pago?.importe}
                      </td>
                      <td>{pago?.cuotas}</td>
                      <td>{pago?.nro_cuota}</td>
                      <td>{new Date(pago?.fecha_hora_pago).toLocaleString()}</td>
                      <td>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeletePago(pago.id)}
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
            <div className={styles.emptyState}>No hay pagos registrados</div>
          )}
        </>
      )}
    </div>
  );
};

export default Pagos;
