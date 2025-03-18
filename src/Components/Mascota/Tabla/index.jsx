import { useState } from "react";
import styles from "./tabla-mascota.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMascota } from "../../../redux/mascotas/thunks.js";
import { ModalAlert, Toast } from "../../Shared";
import { justFecha } from "../../../Functions/utiities.js";
import DetalleMascota from "../Modal/modalMascota.jsx";
import { Box, Typography } from "@mui/material";

const TablaMascota = ({ data, setData, especies }) => {
  const [showModal, setShowModal] = useState(false);
  const [idVMas, setIdMas] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = (mascota) => {
    mascota = { ...mascota, fecha_nacimiento: justFecha(mascota.fecha_nacimiento) };
    history.push(`/admin/mascota/form/${mascota.id}`, {
      params: { ...mascota },
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(updateMascota({ id: id, isActive: false }));
      setData((prevData) => {
        if (Array.isArray(prevData)) {
          return prevData.filter((masco) => masco.id !== id);
        }
        return [];
      });
      setToastMessage("Mascota eliminada correctamente");
      setToastType("Info");
    } catch (error) {
      console.error(error);
      setToastMessage("Error al eliminar mascota");
      setToastType("Error");
    } finally {
      setShowToast(true);
      setIdMas(null);
      setShowModal(false);
      setShowDetalleModal(false);
    }
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`table-responsive p-2 ${styles.tablaContainer}`}>
        <table className={`table table-hover ${styles.tabla}`}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Sexo</th>
              <th>Especie</th>
              <th className={`d-none d-sm-table-cell`}>Raza</th>
              <th className={`d-none d-sm-table-cell`}>Fecha Nacimiento</th>
              <th className={`d-none d-sm-table-cell`}>Dueño</th>
              <th className={`d-none d-lg-table-cell ${styles.hiddenOnSm}`}>Dueño email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.filter((mas) => mas?.owner && typeof mas?.owner === "object").filter((mas) => mas?.isActive)
              .length === 0 ? (
              <Box
                component={"tr"}
                sx={{
                  height: "350px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" color="error">
                    No hay mascotas cargadas
                  </Typography>
                </Box>
              </Box>
            ) : (
              data
                .filter((mas) => mas?.owner && typeof mas?.owner === "object")
                .filter((mas) => mas?.isActive)
                .map((mas, index) => (
                  <tr
                  key={index}
                  className={`${styles.fila}`}
                  onClick={() => {
                    setSelectedMascota(mas);
                    setShowDetalleModal(true);
                  }}
                >
                    <td>{mas?.nombre}</td>
                    <td>{mas?.sexo}</td>
                    <td>{especies.find((especie) => especie.id === mas?.raza?.especie)?.descripcion}</td>
                    <td className={`d-none d-sm-table-cell`}>{mas?.raza?.descripcion}</td>
                    <td className={`d-none d-sm-table-cell`}>{justFecha(mas?.fecha_nacimiento) || "tbd"}</td>
                    <td className={`d-none d-lg-table-cell ${styles.hiddenOnSm}`}>
                      {mas?.owner?.nombre} {mas?.owner?.apellido}
                    </td>
                    <td className={`d-none d-lg-table-cell`}>{mas?.owner?.email}</td>
                    <td>
                      <div className={`d-flex align-items-center justify-content-center ${styles.iconCont}`}>
                        <img
                          onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(mas);
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
                          setShowModal(true);
                            setIdMas(mas.id);
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
      </div>
      <ModalAlert
        text="¿Desea eliminar la mascota?"
        clickAction={() => handleDelete(idVMas)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}

      {showDetalleModal && (
        <DetalleMascota
          mascota={selectedMascota}
          onClose={() => {
            setShowDetalleModal(false);
            setIdMas(null);
          }}
          especies={especies}
          onDelete={() => handleDelete(idVMas)}
          idVMas={idVMas}
          setIdMas={setIdMas}
        />
      )}
    </div>
  );
};

export default TablaMascota;
