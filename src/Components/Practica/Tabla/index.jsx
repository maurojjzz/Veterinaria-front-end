import { useEffect } from "react";
import styles from "./table-practica.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPract, deletePract } from "../../../redux/practicas/thunks.js";

const TablaPractica = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { practicas, pending, error } = useSelector((state) => state.practicas);

  const handleEdit = (practica) => {
    history.push(`/admin/practicas/form/${practica.id}`, { params: { ...practica } });
  };

  useEffect(() => {
    dispatch(getPract());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePract(id));
      console.log("Eliminada correctamente");
      await dispatch(getPract());
    } catch (error) {
      console.error("Error al eliminar la practica", error);
    }
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
            {practicas.map((practica, index) => (
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
