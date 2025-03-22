import { useState, useEffect } from "react";
import styles from "./table-practica.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRaza } from "../../../redux/razas/thunks.js";
import { getEspecie } from "../../../redux/especies/thunks.js";
import { ModalAlert, Toast } from "../../Shared";
import { Typography, Pagination, CircularProgress, Select, MenuItem, TextField } from "@mui/material";

const TablaRaza = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [idRaza, setIdRaza] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEspecie, setSelectedEspecie] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  
  const history = useHistory();
  const dispatch = useDispatch();
  const { especies } = useSelector((state) => state.especies);

  useEffect(() => {
    dispatch(getEspecie());
  }, [dispatch]);

  const handleEdit = (raza) => {
    history.push(`/admin/raza/form/${raza.id}`, { params: { ...raza } });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRaza(id));
      setData((prevData) => prevData.filter((raza) => raza.id !== id));
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

  const filteredData = data
    .filter((mas) => mas?.isActive)
    .filter((raza) => (selectedEspecie ? raza?.especie?.id === selectedEspecie : true))
    .filter((raza) => raza?.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={`d-flex justify-content-center`}>      
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <h1 className="text-center">Razas</h1>
        
        <div className="d-flex mb-3">
          <Select
            value={selectedEspecie}
            onChange={(e) => setSelectedEspecie(e.target.value)}
            displayEmpty
            className="form-control me-2"
          >
            <MenuItem value="">Todas las especies</MenuItem>
            {especies.map((especie) => (
              <MenuItem key={especie.id} value={especie.id}>
                {especie.descripcion}
              </MenuItem>
            ))}
          </Select>

          <TextField
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar raza"
            className="form-control"
          />
        </div>
        
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
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Typography variant="h6" color="error">No hay razas cargadas</Typography>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              paginatedData.map((raz, index) => (
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

