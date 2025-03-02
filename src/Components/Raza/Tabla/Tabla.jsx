import { useState } from "react";
import styles from "./table-practica.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRaza } from "../../../redux/razas/thunks.js";
import { ModalAlert, Toast } from "../../Shared";

const TablaRaza = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [idRaza, setIdRaza] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (raza) => {
    history.push(`/admin/raza/form/${raza.id}`, {
      params: { ...raza },
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRaza(id));
      setData((prevData) => {
        if (Array.isArray(prevData)) {
          return prevData.filter((raza) => raza.id !== id);
        }
        return [];
      });
      setToastMessage("Raza eliminada correctamente");
      setToastType("Info");
    } catch (error) {
      console.log(error);
      setToastMessage("Error al eliminar raza");
      setToastType("Error");
    } finally {
      setShowToast(true);
      setIdRaza(null);
      setShowModal(false);
    }
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Especie</th>
              <th>Raza</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((raz, index) => (
                <tr key={index} className={`${styles.fila}`}>
                  <td>{raz?.especie?.descripcion}</td>
                  <td>{raz?.descripcion}</td>
                  <td>
                    <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                      <img
                        onClick={() => handleEdit(raz)}
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
                        onClick={() => {
                          setShowModal(true);
                          setIdRaza(raz.id);
                        }}
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
        text="¿Desea eliminar la raza?"
        clickAction={() => handleDelete(idRaza)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaRaza;
