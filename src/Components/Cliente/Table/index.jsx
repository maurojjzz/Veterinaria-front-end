import { useState } from "react";
import styles from "./table-cliente.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/users/thunks.js";
import { Toast } from "../../Shared";
import { ModalAlert } from "../../Shared";
import DetalleCliente from "../Modal/modalCliente";

const TablaCliente = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    history.push(`/admin/usuarios/form/${user.id}`, { params: { ...user } });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      setData((prevData) => prevData.filter((usuario) => usuario.id !== id));
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
              <tr 
                key={index} 
                className={`${styles.fila}`} 
                onClick={() => {
                  if (use) {
                    setIdUser(use.id);
                    setSelectedUser(use);
                    setShowModal(true);
                  } 
                }}
              >
                <td>{use?.email}</td>
                <td>{use?.nombre}</td>
                <td className={`d-none d-sm-table-cell `}>{use?.apellido}</td>
                <td className={`d-none d-sm-table-cell`}>{use?.nro_doc}</td>
                <td className={`d-none d-md-table-cell`}>{use?.direccion}</td>
                <td className={`d-none d-md-table-cell`}>{use?.telefono}</td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(use);
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdUser(use.id);
                        setShowModal(true);
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
      {selectedUser && showModal && (
        <DetalleCliente 
          user={selectedUser} 
          onClose={() => setShowModal(false)} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          setToastMessage={setToastMessage}
          setToastType={setToastType} 
        />
      )}
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
