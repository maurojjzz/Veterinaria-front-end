import { useState, useEffect } from "react";
import styles from "./tabla-veterinarios.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateVet } from "../../../redux/veterinarios/thunks.js";
import { ModalAlert, Toast } from "../../Shared";
import DetalleVeterinario from "../Modal/modalVeterinario.jsx";
import { Pagination, Typography, CircularProgress } from "@mui/material";
import FiltrosVeterinario from "./Filtros/FiltrosVeterinario";

const TablaVeterinario = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [idVet, setIdVet] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [selectedVet, setSelectedVet] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [modalMobile, setModalMobile] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (veterinario) => {
    history.push(`/admin/veterinarios/form/${veterinario.id}`, {
      params: { ...veterinario },
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(updateVet({ id: id, isActive: false }));
      setData((prevData) => {
        if (Array.isArray(prevData)) {
          return prevData.filter((veterinario) => veterinario.id !== id);
        }
        return [];
      });
      setToastMessage("Veterinario eliminado correctamente");
      setToastType("Info");
    } catch (error) {
      console.log(error);
      setToastMessage("Error al eliminar veterinario");
      setToastType("Error");
      setShowModal(false);
      setModalMobile(false);
    } finally {
      setShowToast(true);
      setShowModal(false);
      setModalMobile(false);
    }
  };

  useEffect(() => {
    setFilteredData(data.filter((vet) => vet?.isActive));
  }, [data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilter = (value, type) => {
    if (!value) {
      setFilteredData(data.filter((veter) => veter?.isActive));
      return;
    }

    const newFilteredData = data
      .filter((veter) => veter?.isActive)
      .filter((vet) => {
        const fieldValue = vet[type]?.toString().toLowerCase() || "";
        return fieldValue.includes(value.toLowerCase());
      });

    setFilteredData(newFilteredData);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="d-flex flex-column justify-content-center">
      <FiltrosVeterinario onFilter={handleFilter} />

      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Email</th>
              <th className="d-none d-sm-table-cell">Nombre</th>
              <th className="d-none d-sm-table-cell">Apellido</th>
              <th className={`d-none d-sm-table-cell ${styles.hiddenOnSm}`}>Teléfono</th>
              <th className="d-none d-md-table-cell">DNI</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Typography variant="h6" color="error">
                    No hay veterinarios cargados
                  </Typography>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              paginatedData
                ?.filter((vet) => vet.isActive)
                .map((vet, index) => (
                  <tr
                    key={index}
                    className={styles.fila}
                    onClick={() => {
                      setSelectedVet(vet);
                      setModalMobile(true);
                    }}
                  >
                    <td>{vet.matricula}</td>
                    <td>{vet.email}</td>
                    <td className="d-none d-sm-table-cell">{vet.nombre}</td>
                    <td className="d-none d-sm-table-cell">{vet.apellido}</td>
                    <td className={`d-none d-sm-table-cell ${styles.hiddenOnSm}`}>{vet.telefono}</td>
                    <td className="d-none d-md-table-cell">{vet.nro_doc}</td>
                    <td>
                      <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                        <img
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEdit(vet);
                          }}
                          className={styles.tableIcon}
                          src={`${process.env.PUBLIC_URL}/assets/icons/editar.png`}
                          alt="Editar"
                        />
                      </div>
                    </td>
                    <td>
                      <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                        <img
                          onClick={(event) => {
                            event.stopPropagation();
                            setIdVet(vet.id);
                            setShowModal(true);
                          }}
                          className={styles.tableIcon}
                          src={`${process.env.PUBLIC_URL}/assets/icons/basura.png`}
                          alt="Eliminar"
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

      {modalMobile && (
        <DetalleVeterinario
          vet={selectedVet}
          onClose={() => setModalMobile(false)}
          onDelete={() => handleDelete(selectedVet?.id)}
        />
      )}

      <ModalAlert
        text="¿Desea eliminar el veterinario?"
        clickAction={() => handleDelete(idVet)}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaVeterinario;
