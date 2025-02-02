import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones } from "../../../../redux/atenciones/thunks.js";

import styles from "./AtencionesPendientesPago.css";

const AtencionesPendientesPago = () => {

  const dispatch = useDispatch();

  const { atenciones, pending, error } = useSelector((state) => state.atenciones);


  useEffect(() => {
    dispatch(getAtenciones());
  }, [dispatch]);

  if (pending) return <p>Cargando atenciones pendientes de pago...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1>Atenciones Pendientes de Pago</h1>
      {atenciones.length > 0 ? (
        <ul className={styles.list}>
          {console.log(atenciones)}
          {atenciones?.map((atencion) => (
            <li key={atencion.id} className={styles.item}>
              <p>
                <strong>Fecha:</strong> {atencion.fecha_hora_atencion}
              </p>
              <p>
                <strong>Mascota:</strong> {atencion.mascota.nombre}
              </p>
              <p>
                <strong>Monto:</strong> {atencion.importe}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay atenciones pendientes de pago.</p>
      )}
    </div>
  );
};

export default AtencionesPendientesPago;
