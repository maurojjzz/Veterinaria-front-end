import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./tabla-atencion.module.css";
import { handleDate } from "../../../Functions/utiities.js";
import { ModalAtencion } from "../../Shared";
import axios from "../../../axios-config";

const TablaAtencion = ({ data, setData }) => {
  const [owner, setOwner] = useState([]);
  const [raza, setRaza] = useState([]);
  const [modal, setModal] = useState(false);
  const [dataFilaAtencion, setDataFilaAtencion] = useState({});
  const history = useHistory();

  const handleEdit = (ate) => {
    history.push(`/admin/atenciones/form/${ate.id}`, { params: { ...ate } });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/usuarios`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          const usuarios = response.data.data.filter((u) => u.rol.descripcion === "Usuario");
          setOwner(usuarios);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSpecies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/raza`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setRaza(response.data.data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchSpecies();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_KEY}/atenciones/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Eliminado correctamente");
        setData((prevData) => prevData.filter((atencion) => atencion.id !== id));
      } else {
        throw new Error("Error al eliminar la atención");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findOwner = (id) => {
    const due = owner.find((owner) => owner.id === id);
    return `${due?.nombre} ${due?.apellido}`;
  };

  const findSpecie = (id) => {
    const raz = raza.find((spe) => spe.id === id);
    return raz.especie.descripcion;
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
              <th className={`d-none d-sm-table-cell `}>Veterinario</th>
              <th className={`d-none d-sm-table-cell `}>Fecha</th>
              <th className={`d-none d-md-table-cell `}>Practicas</th>
              <th className={`d-none d-lg-table-cell `}>Importe</th>
              <th className={`d-none d-lg-table-cell `}>Abonó</th>
              <th className={`d-none d-lg-table-cell `}>Pago</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((ate, index) => (
              <tr
                key={index}
                className={`${styles.fila}`}
                onClick={() => {
                  setDataFilaAtencion(ate);
                  setModal(!modal);
                }}
              >
                <td>{findOwner(ate.mascota.owner)}</td>
                <td>{ate.mascota.nombre}</td>
                <td className={`d-none d-sm-table-cell `}>{findSpecie(ate.mascota.raza)}</td>
                <td className={`d-none d-sm-table-cell `}>
                  {ate.veterinario.apellido} {ate.veterinario.nombre}
                </td>
                <td className={`d-none d-sm-table-cell `}>{handleDate(ate.fecha_hora_atencion)}</td>
                <td className={`d-none d-md-flex gap-2 ${styles.practicas}`}>
                  <p>{ate.practicas[0].descripcion}</p>
                  {ate.practicas.length > 1 ? (
                    <p className={`${styles.masPracticas}`}> + {ate.practicas.length - 1}</p>
                  ) : (
                    ""
                  )}
                </td>
                <td className={`d-none d-lg-table-cell `}>$ {ate.importe}</td>
                <td className={`d-none d-lg-table-cell `}>{ate.forma_de_pago}</td>
                <td className={`d-none d-lg-table-cell `}>{handleDate(ate.pagos[0]?.fecha_hora_pago)}</td>
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
                        handleDelete(ate.id);
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
          owners={owner}
          raza={raza}
        />
      )}
    </div>
  );
};

export default TablaAtencion;
