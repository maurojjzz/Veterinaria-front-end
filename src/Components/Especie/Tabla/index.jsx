import { useEffect, useState } from "react";
import styles from "./tabla-especie.module.css";
import { Toast, ModalAlert } from "../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { getEspecie, addEspecie, updateEspecie } from "../../../redux/especies/thunks.js";
import { addRaza } from "../../../redux/razas/thunks.js";

const TablaEspecies = () => {
  const [nuevaEspecie, setNuevaEspecie] = useState("");
  const [editandoEspecie, setEditandoEspecie] = useState(null);
  const [descripcionEditada, setDescripcionEditada] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [idToEliminate, setIdToEliminate] = useState(null);
  const [filtro, setFiltro] = useState("");

  const dispatch = useDispatch();
  const { especies } = useSelector((state) => state.especies);

  useEffect(() => {
    dispatch(getEspecie());
  }, [dispatch]);

  const agregarEspecie = async () => {
    const descripcionLimpia = nuevaEspecie.trim();

    if (descripcionLimpia.length === 0) {
      mostrarToast("La descripción no puede estar vacía", "Error");
      return;
    }

    const existe = especies.some((e) => e.descripcion.toLowerCase() === descripcionLimpia.toLowerCase());

    if (existe) {
      mostrarToast("La especie ya existe", "Error");
      return;
    }

    try {
      const esp = await dispatch(addEspecie({ descripcion: descripcionLimpia }));
      setNuevaEspecie("");
      await dispatch(getEspecie());
      await dispatch(addRaza({ especie: esp.id, descripcion: "Sin raza" }));
      mostrarToast("Especie agregada correctamente", "Success");
    } catch (error) {
      mostrarToast("Error al agregar especie", "Error");
    } 
  };

  const iniciarEdicion = (especie) => {
    setEditandoEspecie(especie.id);
    setDescripcionEditada(especie.descripcion);
  };

  const guardarEdicion = async (id) => {
    const descripcionLimpia = descripcionEditada.trim();

    if (descripcionLimpia.length === 0) {
      mostrarToast("La descripción no puede estar vacía", "Error");
      return;
    }

    const existe = especies.some((e) => e.descripcion.toLowerCase() === descripcionLimpia.toLowerCase() && e.id !== id);

    if (existe) {
      mostrarToast("Ya existe una especie con esta descripción", "Error");
      return;
    }

    try {
      await dispatch(updateEspecie({ id, descripcion: descripcionLimpia }));
      setEditandoEspecie(null);
      mostrarToast("Especie editada correctamente", "Success");
      dispatch(getEspecie());
    } catch (error) {
      mostrarToast("Error al editar especie", "Error");
    }
  };

  const confirmarEliminacion = (id) => {
    setIdToEliminate(id);
    setShowModalAlert(true);
  };

  const eliminarEspecie = async () => {
    try {
      await dispatch(updateEspecie({id : idToEliminate, isActive: false}));
      mostrarToast("Especie eliminada correctamente", "Success");
      dispatch(getEspecie());
    } catch (error) {
      mostrarToast("Error al eliminar especie", "Error");
    } finally {
      setShowModalAlert(false);
    }
  };

  const mostrarToast = (mensaje, tipo) => {
    setToastMessage(mensaje);
    setToastType(tipo);
    setShowToast(true);
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <h1 className="text-center">Especies</h1>

        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar especies"
          className="form-control mb-3"
        />

        <div className="d-flex mb-3">
          <input
            type="text"
            value={nuevaEspecie}
            onChange={(e) => setNuevaEspecie(e.target.value)}
            placeholder="Nueva especie"
            className="form-control me-2"
          />
          <button onClick={agregarEspecie} className={styles.addUserBtn}>
            Agregar especie
          </button>
        </div>

        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especies
              .filter((especie) => especie.isActive && especie.descripcion.toLowerCase().includes(filtro.toLowerCase()))
              .map((especie) => (
                <tr key={especie.id}>
                  <td>
                    {editandoEspecie === especie.id ? (
                      <input
                        type="text"
                        value={descripcionEditada}
                        onChange={(e) => setDescripcionEditada(e.target.value)}
                        className="form-control"
                      />
                    ) : (
                      especie.descripcion
                    )}
                  </td>
                  <td>
                    {editandoEspecie === especie.id ? (
                      <button onClick={() => guardarEdicion(especie.id)} className="btn btn-primary">
                        💾 Guardar
                      </button>
                    ) : (
                      <div className={styles.iconCont}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/editar.png`}
                          alt="update icon button"
                          className={styles.tableIcon}
                          onClick={() => iniciarEdicion(especie)}
                        />
                      </div>
                    )}
                    <div className={styles.iconCont}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/basura.png`}
                        alt="delete icon button"
                        className={styles.tableIcon}
                        onClick={() => confirmarEliminacion(especie.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ModalAlert
        text="¿Desea eliminar la especie?"
        clickAction={eliminarEspecie}
        showModal={showModalAlert}
        setShowModal={setShowModalAlert}
      />

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default TablaEspecies;


