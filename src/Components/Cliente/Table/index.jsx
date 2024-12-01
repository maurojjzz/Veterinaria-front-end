import { useState } from "react";
import styles from "./table-cliente.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/users/thunks.js";
import { ModalAlert, Toast } from "../../Shared";

const TablaCliente = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    history.push(`/admin/usuarios/form/${user.id}`, { params: { ...user } });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      setData((prevData) => {
        if (Array.isArray(prevData)) {
          return prevData.filter((usuario) => usuario.id !== id);
        }
        return [];
      });
      setToastMessage("Usuario eliminado correctamente");
      setToastType("Info");
    } catch (error) {
      console.log(error);
      setToastMessage("Error al eliminar usuario");
      setToastType("Error");
    } finally {
      setShowToast(true);
      setIdUser(null);
      setShowModal(false);
    }
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Nombre</th>
              <th className={`d-none d-sm-table-cell `}>Apellido</th>
              <th className={`d-none d-sm-table-cell `}>DNI</th>
              <th className={`d-none d-md-table-cell `}>Direccion</th>
              <th className={`d-none d-md-table-cell `}>Telefono</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((use, index) => (
              <tr key={index} className={`${styles.fila}`}>
                <td>{use.email}</td>
                <td>{use.nombre}</td>
                <td className={`d-none d-sm-table-cell `}>{use.apellido}</td>
                <td className={`d-none d-sm-table-cell`}>{use.nro_doc}</td>
                <td className={`d-none d-md-table-cell`}>{use.direccion}</td>
                <td className={`d-none d-md-table-cell`}>{use.telefono}</td>
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
                      onClick={() => {
                        setShowModal(true);
                        setIdUser(use.id);
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
        text="¿Desea eliminar al usuario?"
        clickAction={() => handleDelete(idUser)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && 
        <Toast 
          title={toastType} 
          message={toastMessage} 
          setError={setShowToast} 
        />}
    </div>
  );
};

export default TablaCliente;
