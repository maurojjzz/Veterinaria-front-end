import React from "react";
import styles from "./table-practica.module.css";
import { useHistory } from 'react-router-dom';

const TablaPractica = ({ data, handleDelete }) => {
  const history = useHistory();

  const handleEdit = (practica) => {
    history.push(`/admin/practicas/form/${practica.id}`, {params: {...practica}})
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Descripcion</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((practica, index) => (
              <tr key={index} className={`${styles.fila}`}>
                <td>{practica.descripcion}</td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      onClick={() => handleEdit(practica)}
                      className={`${styles.tableIcon}`}
                      src={`${process.env.PUBLIC_URL}/assets/icons/editar.png`}
                      alt="update icon button"
                    />
                  </div>
                </td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      className={`${styles.tableIcon}`}
                      onClick={() => handleDelete(practica.id)}
                      src={`${process.env.PUBLIC_URL}/assets/icons/basura.png`}
                      alt="delete icon button"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPractica;

