import { useEffect } from "react";
import styles from "./tabla-veterinarios.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVet, getVet } from "../../../redux/veterinarios/thunks.js";

const TablaVeterinario = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { veterinarios, pending, error } = useSelector((state) => state.veterinarios);


  const handleEdit = (veterinario) => {
    history.push(`/admin/veterinarios/form/${veterinario.id}`, {
      params: { ...veterinario },
    });
  };

  useEffect(() => {
    dispatch(getVet());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteVet(id));
      console.log("Eliminado correctamente");
      await dispatch(getVet());
    } catch (error) {
      console.log("Error al eliminar veterinario",error);
    }
  };

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
            {veterinarios.map((vet, index) => (
              <tr key={index} className={`${styles.fila}`}>
                <td>{vet.matricula}</td>
                <td>{vet.email}</td>
                <td className={`d-none d-sm-table-cell`}>{vet.nombre}</td>
                <td className={`d-none d-sm-table-cell`}>{vet.apellido}</td>
                <td className={`d-none d-sm-table-cell ${styles.hiddenOnSm}`}>{vet.telefono}</td>
                <td className={`d-none d-md-table-cell`}>{vet.nro_doc}</td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      onClick={() => handleEdit(vet)}
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
                      onClick={(event) => handleDelete(vet.id)}
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
