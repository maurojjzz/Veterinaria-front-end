import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./tabla-atencion.module.css";
import { handleDate } from "../../../Functions/utiities.js";
import { ModalAtencion, Toast, ModalAlert } from "../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones, deleteAtencion } from "../../../redux/atenciones/thunks.js";
import { initUsers } from "../../../redux/users/thunks.js";
import { getEspecie } from "../../../redux/especies/thunks.js";
import { getRazas } from "../../../redux/razas/thunks.js";
import { Pagination, Typography, CircularProgress, useMediaQuery, Box, Button } from "@mui/material";
import FiltroOwner from "./Filtros/FiltroOwner";
import FechaFiltro from "../../Users/User/HistorialAtenciones/FechaFiltro/FechaFiltro";
import SwitchFiltro from "./Filtros/SwitchFiltro";
import FiltroVet from "./Filtros/FiltroVeterinario";

const TablaAtencion = () => {
  const [modal, setModal] = useState(false);
  const [dataFilaAtencion, setDataFilaAtencion] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [idToEliminate, setIdToEliminate] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [atencionesFiltradas, setAtencionesFiltradas] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const isSmallScreen = useMediaQuery("(max-width:991px)");
  const isSmallerScreen = useMediaQuery("(max-width:767px)");
  const isMobile = useMediaQuery("(max-width:575px)");

  const history = useHistory();
  const dispatch = useDispatch();

  const { atenciones } = useSelector((state) => state.atenciones);
  const { users } = useSelector((state) => state.users);
  const { razas } = useSelector((state) => state.razas);

  const handleEdit = (ate) => {
    history.push(`/admin/atenciones/form/${ate.id}`, { params: { ...ate } });
  };

  useEffect(() => {
    dispatch(getAtenciones());
    dispatch(initUsers());
    dispatch(getEspecie());
    dispatch(getRazas());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAtencion(id));
      setShowToast(true);
      setToastMessage("Eliminada correctamente");
      setToastType("Success");
      await dispatch(getAtenciones());
    } catch (error) {
      setShowToast(true);
      setToastMessage("Error al eliminar atencion");
      setToastType("Error");
    } finally {
      setShowModalAlert(false);
    }
  };

  const findOwner = (id) => {
    const due = users.find((owner) => owner.id === id);
    return `${due?.nombre} ${due?.apellido}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (selectedOwner) {
      setAtencionesFiltradas(atenciones.filter((ate) => ate?.mascota?.owner === selectedOwner.id));
    } else {
      setAtencionesFiltradas(atenciones);
    }
  }, [selectedOwner, atenciones]);

  const handleDateChange = (type, value) => {
    if (type === "start") {
      const newStartDate = value;
      const start = newStartDate ? new Date(newStartDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (end && start > end) {
        setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
        setIsModalOpen(true);
        setStartDate("");
        setEndDate("");
        return;
      }

      setError("");
      setIsModalOpen(false);
      setStartDate(newStartDate);
    } else if (type === "end") {
      const newEndDate = value;
      const start = startDate ? new Date(startDate) : null;
      const end = newEndDate ? new Date(newEndDate) : null;

      if (start && end < start) {
        setError("La fecha de fin no puede ser anterior a la fecha de inicio.");
        setIsModalOpen(true);
        setStartDate("");
        setEndDate("");
        return;
      }
      setError("");
      setIsModalOpen(false);
      setEndDate(newEndDate);
    }
  };

  const handleSwitchChange = (event) => {
    setIsPending(event.target.checked);
  };



  useEffect(() => {
    setIsLoading(true);
    let filtradas = atenciones;

    if (selectedOwner) {
      filtradas = filtradas.filter((ate) => ate?.mascota?.owner === selectedOwner.id);
    }

    if (startDate) {
      filtradas = filtradas.filter((ate) => new Date(ate.fecha_hora_atencion) >= new Date(startDate));
    }

    if (endDate) {
      const endDateWithTime = new Date(endDate);
      endDateWithTime.setHours(23, 59, 59, 999);
      filtradas = filtradas.filter((ate) => new Date(ate.fecha_hora_atencion) <= endDateWithTime);
    }

    if (isPending) {
      filtradas = filtradas.filter((ate) => ate?.veterinario === undefined);
    }

    if (selectedVet) {
      filtradas = filtradas.filter((ate) => ate?.veterinario?.id === selectedVet.id);
    }

    setTimeout(() => {
      setAtencionesFiltradas(filtradas);
      setIsLoading(false);
    }, 700);
  }, [selectedOwner, atenciones, startDate, endDate, isPending, selectedVet]);

  const atencionesPaginadas = atencionesFiltradas.slice(startIndex, endIndex);

  return (
    <div className={`d-flex flex-column justify-content-center`}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          mb: 2,
        }}
      >
        <FiltroOwner onSelectOwner={setSelectedOwner} />
        <FiltroVet onSelectVet={setSelectedVet} />
        <FechaFiltro startDate={startDate} endDate={endDate} handleDateChange={handleDateChange} />
        <SwitchFiltro checked={isPending} onChange={handleSwitchChange} />
      </Box>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Dueño</th>
              <th>Mascota</th>
              <th className={`d-none d-sm-table-cell `}>Especie</th>
              <th className={`d-none d-sm-table-cell `}>Fecha</th>
              <th className={`d-none d-sm-table-cell `}>Veterinario</th>
              <th className={`d-none d-md-table-cell `}>Practicas</th>
              <th className={`d-none d-lg-table-cell `}>Importe</th>
              <th className={`d-none d-lg-table-cell `}>Forma de pago</th>
              <th className={`d-none d-lg-table-cell `}>Pago</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Typography variant="h6" color="error">
                    Cargando atenciones...
                  </Typography>
                  <CircularProgress />
                </td>
              </tr>
            ) : atencionesPaginadas.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Typography variant="h6" color="error">
                    No hay atenciones cargadas
                  </Typography>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              atencionesPaginadas.map((ate, index) => (
                <tr
                  key={index}
                  className={`${styles.fila}`}
                  onClick={() => {
                    setDataFilaAtencion(ate);
                    setModal(!modal);
                  }}
                >
                  <td>{findOwner(ate?.mascota?.owner)}</td>
                  <td>{ate?.mascota?.nombre}</td>
                  <td className={`d-none d-sm-table-cell `}>
                    {razas.find((ra) => ra.id === ate?.mascota?.raza)?.especie?.descripcion}
                  </td>
                  <td className={`d-none d-sm-table-cell `}>{handleDate(ate?.fecha_hora_atencion)}</td>

                  {ate?.veterinario ? (
                    <>
                      <td className={`d-none d-sm-table-cell `}>
                        {ate?.veterinario?.apellido} {ate?.veterinario?.nombre}
                      </td>
                      <td className={`d-none d-md-flex gap-2 ${styles.practicas}`}>
                        <p>{ate?.practicas[0]?.descripcion}</p>
                        {ate?.practicas?.length > 1 ? (
                          <p className={`${styles.masPracticas}`}> + {ate.practicas.length - 1}</p>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className={`d-none d-lg-table-cell `}>$ {ate?.importe}</td>
                      <td className={`d-none d-lg-table-cell `}>{ate?.forma_de_pago}</td>
                      <td className={`d-none d-lg-table-cell `}>{handleDate(ate?.pagos[0]?.fecha_hora_pago)}</td>
                    </>
                  ) : (
                    !isMobile && (
                      <td colSpan={isSmallerScreen ? 1 : isSmallScreen ? 2 : 5}>
                        <Typography variant="h5" sx={{ fontSize: isSmallerScreen ? "0.9rem" : "1.2rem" }} color="error">
                          Aún no ha sido atendido por un veterinario
                        </Typography>
                      </td>
                    )
                  )}

                  
                  <td>
                    <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                      <img
                        onClick={() => handleEdit(ate)}
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
                          setIdToEliminate(ate.id);
                          setShowModalAlert(true);
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
          count={Math.ceil(atenciones.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          sx={{ marginTop: "20px" }}
        />
      </div>
      {isModalOpen && (
        <Box className={styles.modalOverlay}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2>Advertencia</h2>
            <p>{error}</p>
            <Button variant="contained" onClick={() => setIsModalOpen(false)}>
              {" "}
              Entendido{" "}
            </Button>
          </Box>
        </Box>
      )}
      {modal && (
        <ModalAtencion
          setModal={setModal}
          dataFilaAtencion={dataFilaAtencion}
          setDataFilaAtencion={setDataFilaAtencion}
          owners={users}
          raza={razas}
          setShowToast={setShowToast}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
        />
      )}
      <ModalAlert
        text="¿Desea eliminar la atencion?"
        clickAction={() => handleDelete(idToEliminate)}
        showModal={showModalAlert}
        setShowModal={setShowModalAlert}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaAtencion;
