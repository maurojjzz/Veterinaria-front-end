import { useState, useEffect } from "react";
import styles from "./table-cliente.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/users/thunks.js";
import { Toast } from "../../Shared";
import { ModalAlert } from "../../Shared";
import DetalleCliente from "../Modal/modalCliente";
import { Pagination, Typography, CircularProgress } from "@mui/material";
import FiltrosClientes from "./Filtros/FiltrosClientes"

const TablaCliente = ({ data, setData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [modalMobile, setModalMobile] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    history.push(`/admin/usuarios/form/${user.id}`, { params: { ...user } });
  };

  const handleDelete = async () => {
    try {
      await dispatch(updateUser({ id: idUser, isActive: false }));
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

  useEffect(() => {
    setFilteredData(data.filter((mas) => mas?.isActive));
  }, [data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilter = (value, type) => {
    if (!value) {
      setFilteredData(data.filter((cliente) => cliente?.isActive)); 
      return;
    }

    const newFilteredData = data
      .filter((cliente) => cliente?.isActive)
      .filter((cliente) => {
        const fieldValue = cliente[type]?.toString().toLowerCase() || ""; 
        return fieldValue.includes(value.toLowerCase());
      });

    setFilteredData(newFilteredData);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={`d-flex flex-column justify-content-center`}>
      <FiltrosClientes onFilter={handleFilter} />
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
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Typography variant="h6" color="error">
                    No hay clientes cargados
                  </Typography>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              paginatedData
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
                ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
          />
        )}
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
