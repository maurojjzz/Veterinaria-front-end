import { useEffect, useState } from "react";
import styles from "./table-practica.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPract, deletePract } from "../../../redux/practicas/thunks.js";
import { Toast, ModalAlert } from "../../Shared";

const TablaPractica = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { practicas } = useSelector((state) => state.practicas);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [idToEliminate, setIdToEliminate] = useState(null);

  useEffect(() => {
    dispatch(getPract());
  }, [dispatch]);

  const handleEdit = (practica) => {
    history.push(`/admin/practicas/form/${practica.id}`, { params: { ...practica } });
  };

  const confirmarEliminacion = (id) => {
    setIdToEliminate(id);
    setShowModalAlert(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePract(idToEliminate));
      mostrarToast("Práctica eliminada correctamente", "Success");
      dispatch(getPract());
    } catch (error) {
      mostrarToast("Error al eliminar la práctica", "Error");
    } finally {
      setShowModalAlert(false);
    }
  };

  const mostrarToast = (mensaje, tipo) => {
    setToastMessage(mensaje);
    setToastType(tipo);
    setShowToast(true);
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
                      onClick={() => confirmarEliminacion(practica.id)}
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

      <ModalAlert
        text="¿Desea eliminar la práctica?"
        clickAction={handleDelete}
        showModal={showModalAlert}
        setShowModal={setShowModalAlert}
      />

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaPractica;


