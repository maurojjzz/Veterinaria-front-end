import { useState } from "react";
import styles from "./table-practica.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePract } from "../../../redux/practicas/thunks.js";
import { ModalAlert, Toast } from "../../Shared";
import { Pagination, Typography, CircularProgress, Slider } from "@mui/material";

const TablaPractica = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [idPractica, setIdPractica] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (practica) => {
    history.push(`/admin/practicas/form/${practica.id}`, {
      params: { ...practica },
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleDelete = async (id) => {
    try {
      await dispatch(updatePract({ id: id, isActive: false }));
      setData((prevData) => prevData.filter((pra) => pra.id !== id));
      setToastMessage("Practica eliminada correctamente");
      setToastType("Info");
    } catch (error) {
      setToastMessage("Error al eliminar practica");
      setToastType("Error");
    } finally {
      setShowToast(true);
      setIdPractica(null);
      setShowModal(false);
    }
  };

  const getNearestPrice = (precios) => {
    if (!precios || precios.length === 0) return "Sin precio";
    const today = new Date();
    const nearest = precios
      .map((p) => ({ ...p, fecha: new Date(p.fecha) }))
      .sort((a, b) => Math.abs(a.fecha - today) - Math.abs(b.fecha - today))[0];
    return nearest ? nearest.valor : "Sin precio";
  };

  const filteredData = data.filter(
    (pra) => pra?.isActive && getNearestPrice(pra.precios) >= priceRange[0] && getNearestPrice(pra.precios) <= priceRange[1]
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100 d-flex flex-column align-items-center p-2">
        <Typography variant="h6">Filtrar por precio</Typography>
        <Slider
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          sx={{ width: "80%", maxWidth: 400 }}
        />
      </div>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Practica</th>
              <th>Precio</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <Typography variant="h6" color="error">
                    No hay practicas cargadas
                  </Typography>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              paginatedData.map((pra, index) => (
                <tr key={index} className={`${styles.fila}`}>
                  <td>{pra?.descripcion}</td>
                  <td>$ {getNearestPrice(pra.precios)}</td>
                  <td>
                    <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                      <img
                        onClick={() => handleEdit(pra)}
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
                          setIdPractica(pra.id);
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
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        />
      </div>
      <ModalAlert
        text="¿Desea eliminar la practica?"
        clickAction={() => handleDelete(idPractica)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaPractica;
