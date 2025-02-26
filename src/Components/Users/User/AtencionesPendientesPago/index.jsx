"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAtenciones } from "../../../../redux/atenciones/thunks.js"
import { decodeToken } from "../../../../Functions/utiities.js"
import "./AtencionesPendientesPago.css"

const AtencionesPendientesPago = () => {
  const dispatch = useDispatch()

  const { atenciones = [] } = useSelector((state) => state.atenciones)
  const token = useSelector((state) => state.auth.token)
  const usuario = token ? decodeToken(token) : null

  useEffect(() => {
    dispatch(getAtenciones())
  }, [dispatch])

  const isAtencionPendienteDePago = (atencion) => {
    if (!usuario || !atencion) return false

    if (atencion.usuario_id !== usuario.id) return false

    return (
      !atencion.fecha_hora_pago ||
      atencion.fecha_hora_pago === "null" ||
      atencion.fecha_hora_pago === null ||
      atencion.fecha_hora_pago === ""
    )
  }

  const atencionesUsuario = atenciones.filter(isAtencionPendienteDePago)

  return (
    <div className="container">
      <h1 className="title">Atenciones Pendientes de Pago</h1>
      {atencionesUsuario.length > 0 ? (
        <div className="grid">
          {atencionesUsuario.map((atencion) => (
            <div key={atencion.id} className="card">
              <p>
                <strong>Fecha:</strong> {atencion.fecha_hora_atencion}
              </p>
              <p>
                <strong>Mascota:</strong> {atencion.mascota.nombre}
              </p>
              <p>
                <strong>Monto:</strong> ${atencion.importe}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No hay atenciones pendientes de pago.</p>
      )}
    </div>
  )
}

export default AtencionesPendientesPago




