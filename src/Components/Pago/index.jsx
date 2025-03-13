import { useEffect, useState } from "react";
import styles from "./pago.module.css";
import { getPagos, deletePago } from "../../redux/pagos/thunks.js";
import { useDispatch, useSelector } from "react-redux";

const Pagos = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { pagos } = useSelector((state) => state.pagos);

  console.log(pagos);
  
  useEffect(() => {
    try {
      setLoading(true);
      dispatch(getPagos())
    }  catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  }, [dispatch]);

const handleDeletePago = (id) => {  
  try {
    setLoading(true);
    dispatch(deletePago(id));
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }

}
 


  return (
    <div className={styles.pagosContainer}>
      <h2 className={styles.pagosHeader}>Lista de Pagos</h2>


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
                    <tr key={pago.id}>
                      <td>{pago.forma_de_pago}</td>
                      <td>
                        $
                        {typeof pago.importe === "number"
                          ? pago.importe.toLocaleString()
                          : pago.importe}
                      </td>
                      <td>{pago.cuotas}</td>
                      <td>{pago.nro_cuota}</td>
                      <td>{new Date(pago.fecha_hora_pago).toLocaleString()}</td>
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
