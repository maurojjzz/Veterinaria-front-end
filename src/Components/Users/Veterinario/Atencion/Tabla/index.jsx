import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./tabla-atencion.module.css";
import { handleDate } from "../../../../../Functions/utiities.js";
import { ModalAtencion, Toast, ModalAlert } from "../../../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones, deleteAtencion } from "../../../../../redux/atenciones/thunks.js";
import { initUsers } from "../../../../../redux/users/thunks.js";
import { getEspecie } from "../../../../../redux/especies/thunks.js";
import { getRazas } from "../../../../../redux/razas/thunks.js";

const TablaAtencion = () => {
  const [modal, setModal] = useState(false);
  const [dataFilaAtencion, setDataFilaAtencion] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [idToEliminate, setIdToEliminate] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const { atenciones } = useSelector((state) => state.atenciones);
  const { users } = useSelector((state) => state.users);
  const { especies } = useSelector((state) => state.especies);
  const { razas } = useSelector((state) => state.razas);

  const handleEdit = (ate) => {
    history.push(`/vet/atenciones/form/${ate.id}`, { params: { ...ate } });
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

  const findSpecie = (id) => {
    if (!especies || especies.length === 0) {
      return "Especie no encontrada";
    }
    const raz = especies.find((spe) => spe.id === id);
    return raz ? raz.especies?.descripcion : "Especie no encontrada";
  };

  return (
    <div className={`d-flex justify-content-center`}>
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
              <th className={`d-none d-lg-table-cell `}>Abonó</th>
              <th className={`d-none d-lg-table-cell `}>Pago</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {atenciones.map((ate, index) => (
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
                <td className={`d-none d-sm-table-cell `}>{findSpecie(ate?.mascota?.raza)}</td>
                <td className={`d-none d-sm-table-cell `}>{handleDate(ate?.fecha_hora_atencion)}</td>
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
            ))}
          </tbody>
        </table>
      </div>
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
