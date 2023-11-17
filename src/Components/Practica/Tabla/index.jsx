import React from "react";
import styles from "./table-practica.module.css";
import { useHistory} from 'react-router-dom';


const TablaPractica = ({ data }) => {
  const history = useHistory();


  const handleEdit = (user) => {
    history.push(`/admin/practicas/form/${user.id}`, {params: {...user}})
  };

  const handleDelete = async (id)=>{
    try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/practicas/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
          console.log('Error al eliminar practica')
        } else{
            console.log('Eliminada correctamente')
        }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((use, index) => (
              <tr
                key={index}
                className={`${styles.fila}`}
              >
                <td>{use.descripcion}</td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      onClick={() => handleEdit(use)}
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
                      onClick={() => handleDelete(use.id)}
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
