import { useState } from "react";
import styles from "./table-cliente.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/users/thunks.js";
import { Toast } from "../../Shared";
import { ModalAlert } from "../../Shared";
import DetalleCliente from "../Modal/modalCliente";

const TablaCliente = ({ data, setData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [modalMobile, setModalMobile] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    history.push(`/admin/usuarios/form/${user.id}`, { params: { ...user } });
  };

  const handleDelete = async () => {
    try {
      await dispatch(updateUser({id: idUser, isActive: false}));
      setData((prevData) => {
        if (Array.isArray(prevData)) {
          return prevData.filter((usuario) => usuario.id !== idUser);
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
      setShowDeleteModal(false);
      setModalMobile(false);
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
              <th className={`d-none d-md-table-cell `}>Dirección</th>
              <th className={`d-none d-md-table-cell `}>Teléfono</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
            .filter((user) => user.isActive)
            .map((user, index) => (
              <tr
                key={index}
                className={`${styles.fila}`}
                onClick={() => {
                  setSelectedUser(user);
                  setModalMobile(true);
                }}
              >
                <td>{user?.email}</td>
                <td>{user?.nombre}</td>
                <td className={`d-none d-sm-table-cell `}>{user?.apellido}</td>
                <td className={`d-none d-sm-table-cell`}>{user?.nro_doc}</td>
                <td className={`d-none d-md-table-cell`}>{user?.direccion}</td>
                <td className={`d-none d-md-table-cell`}>{user?.telefono}</td>
                <td>
                  <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(user);
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
                        setIdUser(user.id);
                        setShowDeleteModal(true);
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
        clickAction={handleDelete}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
      {modalMobile && (
        <DetalleCliente
          user={selectedUser}
          idUser={idUser}
          setIdUser={setIdUser}
          onClose={() => {
            setModalMobile(false);
            setIdUser(null);
          }}
          onDelete={handleDelete}
        />
      )}
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaCliente;