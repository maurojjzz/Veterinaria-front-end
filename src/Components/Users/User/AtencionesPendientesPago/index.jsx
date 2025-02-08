import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones } from "../../../../redux/atenciones/thunks.js";
import "./AtencionesPendientesPago.css";

const AtencionesPendientesPago = () => {
  const dispatch = useDispatch();


  const { atenciones, pending, error } = useSelector((state) => state.atenciones);
  const usuario = useSelector((state) => state.auth.usuario); 

  useEffect(() => {
    dispatch(getAtenciones());
  }, [dispatch]);

  if (pending) return <p className="loading">Cargando atenciones pendientes de pago...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const atencionesUsuario = atenciones?.filter(
    (atencion) => atencion.usuario_id === usuario?.id
  );

  return (
    <div className="container">
      <h1 className="title">Atenciones Pendientes de Pago</h1>
      {atencionesUsuario.length > 0 ? (
        <div className="grid">
          {atencionesUsuario.map((atencion) => (
            <div key={atencion.id} className="card">
              <p><strong>Fecha:</strong> {atencion.fecha_hora_atencion}</p>
              <p><strong>Mascota:</strong> {atencion.mascota.nombre}</p>
              <p><strong>Monto:</strong> ${atencion.importe}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No hay atenciones pendientes de pago.</p>
      )}
    </div>
  );
};

export default AtencionesPendientesPago;

