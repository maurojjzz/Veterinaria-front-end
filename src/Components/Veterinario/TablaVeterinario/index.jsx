import { useState } from "react";
import styles from "./tabla-veterinarios.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVet } from "../../../redux/veterinarios/thunks.js";
import { ModalAlert, Toast } from "../../Shared";
import DetalleVeterinario from "../Modal/modalVeterinario.jsx";

const TablaVeterinario = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (veterinario) => {
    history.push(`/admin/veterinarios/form/${veterinario.id}`, {
      params: { ...veterinario },
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteVet(id));
      setData((prevData) => prevData.filter((vet) => vet.id !== id));
      setToastMessage("Veterinario eliminado correctamente");
      setToastType("Info");
    } catch (error) {
      console.log(error);
      setToastMessage("Error al eliminar veterinario");
      setToastType("Error");
    } finally {
      setShowToast(true);
      setShowModal(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Email</th>
              <th className="d-none d-sm-table-cell">Nombre</th>
              <th className="d-none d-sm-table-cell">Apellido</th>
              <th className="d-none d-sm-table-cell">Teléfono</th>
              <th className="d-none d-md-table-cell">DNI</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((vet, index) => (
              <tr
                key={index}
                className={styles.fila}
                onClick={() => {
                  setSelectedVet(vet);
                  setShowModal(true);
                }}
              >
                <td>{vet.matricula}</td>
                <td>{vet.email}</td>
                <td className="d-none d-sm-table-cell">{vet.nombre}</td>
                <td className="d-none d-sm-table-cell">{vet.apellido}</td>
                <td className="d-none d-sm-table-cell">{vet.telefono}</td>
                <td className="d-none d-md-table-cell">{vet.nro_doc}</td>
                <td>
                  <div
                    className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}
                  >
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(vet);
                      }}
                      className={styles.tableIcon}
                      src={`${process.env.PUBLIC_URL}/assets/icons/editar.png`}
                      alt="Editar"
                    />
                  </div>
                </td>
                <td>
                  <div
                    className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}
                  >
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVet(vet);
                        setShowModal(true);
                      }}
                      className={styles.tableIcon}
                      src={`${process.env.PUBLIC_URL}/assets/icons/basura.png`}
                      alt="Eliminar"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVet && showModal && (
        <DetalleVeterinario
          vet={selectedVet}
          onClose={() => setShowModal(false)}
          onDelete={handleDelete}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
        />
      )}

      {showToast && (
        <Toast title={toastType} message={toastMessage} setError={setShowToast} />
      )}
    </div>
  );
};

export default TablaVeterinario;

