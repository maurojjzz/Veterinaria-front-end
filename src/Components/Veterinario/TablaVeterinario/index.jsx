import React from "react";
import styles from "./tabla-veterinarios.module.css";

const TablaVeterinario = ({ data }) => {
  const handleEdit = (id) => {
    console.log("Se va a editar", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/veterinarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Error al eliminar veterinario");
      } else {
        console.log("Eliminado correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th className={`d-none d-sm-table-cell `}>Teléfono</th>
              <th className={`d-none d-md-table-cell `}>Email</th>
              <th className={`d-none d-md-table-cell `}>DNI</th>
              <th className={`d-none d-lg-table-cell `}>Rol</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((vet, index) => (
              <tr
                key={index}
                className={`${styles.fila}`}
                onClick={() => {
                  console.log(vet);
                }}
              >
                <td>{vet.matricula}</td>
                <td>{vet.nombre}</td>
                <td>{vet.apellido}</td>
                <td className={`d-none d-sm-table-cell `}>{vet.telefono}</td>
                <td className={`d-none d-md-table-cell `}>{vet.email}</td>
                <td className={`d-none d-md-table-cell `}>{vet.nro_doc}</td>
                <td className={`d-none d-lg-table-cell `}>{vet.rol.descripcion}</td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      onClick={() => handleEdit(vet.id)}
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
                      onClick={() => handleDelete(vet.id)}
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