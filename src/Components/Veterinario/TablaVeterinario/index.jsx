import React, { useState } from "react";
import styles from "./tabla-veterinarios.module.css";
import { useHistory } from "react-router-dom";
import axios from "../../../axios-config";

const TablaVeterinario = ({ data, setData }) => {
  const [filteredData, setFilteredData] = useState([...data]);
  const history = useHistory();

  const handleEdit = (veterinario) => {
    history.push(`/admin/veterinarios/form/${veterinario.id}`, {
      params: { ...veterinario },
    });
  };

  const handleDelete = async (id, event) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_KEY}/veterinarios/${id}`);

      if (response.status === 200) {
        const updatedData = data.filter((vet) => vet.id !== id);
        console.log("updatedData después de la eliminación:", updatedData);
        setData(updatedData);
        setFilteredData(updatedData);
        console.log("Eliminado correctamente");
      } else {
        console.log("Error al eliminar veterinario");
      }
    } catch (error) {
      console.log(error);
    }

    if (event) {
      event.preventDefault();
    }
  };

  console.log("data en TablaVeterinario:", data);
  console.log("filteredData en TablaVeterinario:", filteredData);

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Email</th>
              <th className={`d-none d-sm-table-cell`}>Nombre</th>
              <th className={`d-none d-sm-table-cell`}>Apellido</th>
              <th className={`d-none d-sm-table-cell ${styles.hiddenOnSm}`}>Teléfono</th>
              <th className={`d-none d-md-table-cell`}>DNI</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((vet, index) => (
              <tr key={index} className={`${styles.fila}`}>
                <td>{vet.matricula}</td>
                <td>{vet.email}</td>
                <td className={`d-none d-sm-table-cell`}>{vet.nombre}</td>
                <td className={`d-none d-sm-table-cell`}>{vet.apellido}</td>
                <td className={`d-none d-sm-table-cell ${styles.hiddenOnSm}`}>{vet.telefono}</td>
                <td className={`d-none d-md-table-cell`}>{vet.nro_doc}</td>
                <td>
                  <div
                    className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}
                  >
                    <img
                      onClick={() => handleEdit(vet)}
                      className={`${styles.tableIcon}`}
                      src={`${process.env.PUBLIC_URL}/assets/icons/editar.png`}
                      alt="update icon button"
                    />
                  </div>
                </td>
                <td>
                  <div
                    className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}
                  >
                    <img
                      className={`${styles.tableIcon}`}
                      onClick={(event) => handleDelete(vet.id, event)}
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

export default TablaVeterinario;
