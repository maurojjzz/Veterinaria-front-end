import React from 'react'
import styles from './table-cliente.module.css'

const TablaCliente = ({data}) => {

    console.log(data, 'desde tabla componente')

  return (
    <div>
      <div className={`table-responsive p-2`}>
        <table className={`table ${styles.tabla}`}>
          <thead>
            <tr>
              <th >Email</th>
              <th >Nombre</th>
              <th className={`d-none d-sm-table-cell `}>Apellido</th>
              <th className={`d-none d-sm-table-cell `}>DNI</th>
              <th className={`d-none d-md-table-cell `}>Direccion</th>
              <th className={`d-none d-md-table-cell `}>Telefono</th>
              <th ></th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
          {data.map((use, index) => (
            <tr key={index}>
              <td>{use.email}</td>
              <td>{use.nombre}</td>
              <td className={`d-none d-sm-table-cell `}>{use.apellido}</td>
              <td className={`d-none d-sm-table-cell`}>{use.nro_doc}</td>
              <td className={`d-none d-md-table-cell`}>{use.direccion}</td>
              <td className={`d-none d-md-table-cell`}>{use.telefono}</td>
              <td><div className={`${styles.oxi}`}></div> </td>
              <td><div className={`${styles.oxi}`}></div></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaCliente
