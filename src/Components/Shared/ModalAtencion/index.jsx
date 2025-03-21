import { useEffect, useState } from "react";
import styles from "./modal-atencion.module.css";
import { BoxUserIcon, BoxPetIcon, BoxVetIcon } from "../";
import { handleDate } from "../../../Functions/utiities.js";
import { ModalAlert } from "../../Shared";
import { useDispatch } from "react-redux";
import { getPagos, addPago } from "../../../redux/pagos/thunks.js";
import { getAtenciones } from "../../../redux/atenciones/thunks.js";
import { Box, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const ModalAtencion = ({
  setModal,
  setDataFilaAtencion,
  dataFilaAtencion,
  owners,
  raza,
  setShowToast,
  setToastMessage,
  setToastType,
}) => {
  const [dueno, setDueno] = useState("");
  const [razaPet, setRazaPet] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPagos());
  }, [dispatch]);

  useEffect(() => {
    const due = owners.find((owner) => owner.id === dataFilaAtencion.mascota.owner);
    setDueno(due || {});
    const raz = raza.find((r) => r.id === dataFilaAtencion.mascota.raza);
    setRazaPet(raz || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilaAtencion, owners, raza]);

  const edadPet = (fecha) => {
    const hoy = new Date();
    const birth = new Date(fecha);
    const edad = hoy.getFullYear() - birth.getFullYear();

    if (hoy.getMonth() < birth.getMonth() || (hoy.getMonth() === birth.getMonth() && hoy.getDate() < birth.getDate())) {
      return edad - 1;
    }
    return edad;
  };

  const handleEdit = (ate) => {
    const role = localStorage.getItem("role");
    if (role === "Veterinario") history.push(`/vet/atenciones/form/${ate.id}`, { params: { ...ate } });
    if (role === "Admin") history.push(`/admin/atenciones/form/${ate.id}`, { params: { ...ate } });
  };

  const handleAddPago = async () => {
    const pago = {
      atencion: dataFilaAtencion?.id,
      importe: dataFilaAtencion?.importe,
      fecha_hora_pago: new Date().toISOString(),
      forma_de_pago: dataFilaAtencion?.forma_de_pago,
      cuotas: 1,
      nro_cuota: 1,
    };
    try {
      await dispatch(addPago(pago));
      setShowToast(true);
      setToastMessage("Pago registrado exitosamente");
      setToastType("Success");
    } catch (error) {
      setShowToast(true);
      setToastMessage("Hubo un error al registrar el pago");
      setToastType("Error");
    } finally {
      await dispatch(getAtenciones());
      setModal(false);
    }
  };

  return (
    <div className={`${styles.wholeContainer}`}>
      <div className={`d-flex flex-column align-items-center rounded-2 bg-light pb-4 pt-2 ${styles.container}`}>
        <div className={`d-flex justify-content-end  w-100 pe-2 pb-2`}>
          <Button
            variant="outlined"
            color="success"
            disabled={dataFilaAtencion.pagos.length > 0}
            sx={{
              fontWeight: "bold",
              mr: 3,
            }}
            onClick={() => setShowModal(true)}
          >
            {dataFilaAtencion?.pagos?.length > 0 ? "Pagado" : "Pagar"}
          </Button>
          <img
            onClick={() => {
              setDataFilaAtencion({});
              setModal(false);
            }}
            className={`${styles.tableIcon}`}
            src={`${process.env.PUBLIC_URL}/assets/icons/cerrar.png`}
            alt="update icon button"
          />
        </div>

        <h4>Atencion</h4>
        <div className={`d-flex flex-column align-items-center text-center rounded-3 border ${styles.boxUser}`}>
          <div>
            <p>Fecha atencion: {handleDate(dataFilaAtencion?.fecha_hora_atencion)}</p>
          </div>
          <h5>Practicas</h5>
          <div>
            {dataFilaAtencion?.practicas?.map((pra, index) => (
              <div key={index}>
                <span className="text-muted fw-medium">{pra?.descripcion}</span>
              </div>
            ))}
          </div>
        </div>
        <h4>Dueño</h4>
        <div className={`d-flex flex-column rounded-3 border ${styles.boxUser}`}>
          <div className={`d-flex `}>
            <div
              className={`d-flex flex-column align-items-center justify-content-center gap-2 p-3  border-end border-2`}
            >
              <BoxUserIcon ownerId={dataFilaAtencion?.mascota?.owner} owners={owners} />
              <div className={` text-center fs-5 ${styles.nameBox}`}>
                <div>{dueno?.nombre}</div>
                <div>{dueno?.apellido}</div>
              </div>
            </div>
            <div className={`d-flex flex-column flex-grow-1 p-2 gap-2  justify-content-center`}>
              <div className={`d-flex flex-column align-items-center flex-sm-row justify-content-sm-evenly`}>
                <div className={`d-none d-sm-block`}>
                  <div className={`fw-medium text-center`}>Email</div>
                  <div>{dueno?.email}</div>
                </div>
                <div>
                  <div className={`fw-medium text-center`}>DNI</div>
                  <div>{dueno?.nro_doc}</div>
                </div>
              </div>
              <div className={`d-flex flex-column align-items-center flex-sm-row justify-content-sm-evenly `}>
                <div>
                  <div className={`fw-medium text-center`}>Telefono</div>
                  <div>{dueno?.telefono}</div>
                </div>
                <div>
                  <div className={`fw-medium `}>Direccion</div>
                  <div>{dueno?.direccion}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={`d-flex d-sm-none flex-column align-items-center p-1 border-top border-2`}>
            <div className={`fw-medium`}>Email</div>
            <div>{dueno?.email}</div>
          </div>
        </div>
        <h4>Mascota</h4>
        <div className={`d-flex  border  ${styles.boxMascotas}`}>
          <div
            className={`d-flex flex-column align-items-center justify-content-center gap-2 p-3 border-end border-2 ${styles.iconTextPet}`}
          >
            <BoxPetIcon especie={razaPet?.especie?.descripcion} />
            <div className={` text-center fs-5`}>{dataFilaAtencion?.mascota?.nombre}</div>
          </div>
          <div className={`d-flex flex-column justify-content-center flex-grow-1`}>
            <div className={`d-flex flex-column align-items-center flex-sm-row justify-content-sm-evenly`}>
              <div>
                <div className={`fw-medium text-center`}>Especie</div>
                <div>{razaPet?.especie?.descripcion}</div>
              </div>
              <div>
                <div className={`fw-medium text-center`}>Raza</div>
                <div>{razaPet?.descripcion}</div>
              </div>
            </div>
            <div className={`d-flex flex-column align-items-center flex-sm-row justify-content-sm-evenly`}>
              <div>
                <div className={`fw-medium text-center`}>Sexo</div>
                <div>{dataFilaAtencion?.mascota?.sexo}</div>
              </div>
              <div>
                <div className={`fw-medium text`}>Edad</div>
                <div className="text-center">{edadPet(dataFilaAtencion?.mascota?.fecha_nacimiento)}</div>
              </div>
            </div>
          </div>
        </div>
        {dataFilaAtencion?.veterinario ? (
          <>
            <h4>Veterinario</h4>
            <div className={`d-flex flex-column rounded-3 border ${styles.boxUser}`}>
              <div className={`d-flex `}>
                <div
                  className={`d-flex flex-column align-items-center justify-content-center gap-2 p-3  border-end border-2`}
                >
                  <BoxVetIcon
                    nombre={dataFilaAtencion?.veterinario?.nombre}
                    apellido={dataFilaAtencion?.veterinario?.apellido}
                  />
                  <div className={` text-center fs-5 ${styles.nameBox}`}>
                    <div>{dataFilaAtencion?.veterinario?.nombre}</div>
                    <div>{dataFilaAtencion?.veterinario?.apellido}</div>
                  </div>
                </div>
                <div className={`d-flex flex-column flex-grow-1  justify-content-center ${styles.boxVet}`}>
                  <div className={`d-flex flex-column align-items-center flex-sm-row justify-content-sm-evenly`}>
                    <div className={`d-none d-sm-block`}>
                      <div className={`fw-medium text-center`}>Email</div>
                      <div>{dataFilaAtencion?.veterinario?.email}</div>
                    </div>
                    <div>
                      <div className={`fw-medium text-center`}>Matricula</div>
                      <div>{dataFilaAtencion?.veterinario?.matricula}</div>
                    </div>
                  </div>
                  <div className={`d-flex flex-column align-items-center flex-sm-row justify-content-sm-evenly `}>
                    <div>
                      <div className={`fw-medium text-center`}>DNI</div>
                      <div>{dataFilaAtencion?.veterinario?.nro_doc}</div>
                    </div>
                    <div>
                      <div className={`fw-medium text-center`}>Telefono</div>
                      <div>{dataFilaAtencion?.veterinario?.telefono}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`d-flex d-sm-none flex-column align-items-center p-1 border-top border-2`}>
                <div className={`fw-medium`}>Email</div>
                <div>{dataFilaAtencion?.veterinario?.email}</div>
              </div>
            </div>
            <h4>Pago</h4>
            <div className={`d-flex flex-column gap-2 rounded-3 border ${styles.boxUser}`}>
              <div
                className={`d-flex flex-column flex-sm-row justify-content-sm-evenly align-items-center text-center gap-2 pt-sm-3 pt-1`}
              >
                <div>
                  <div className={`fw-medium`}>Importe</div>
                  <div>${dataFilaAtencion?.importe}</div>
                </div>
                <div>
                  <div className={`fw-medium`}>Pagara/pago con</div>
                  <div>{dataFilaAtencion?.forma_de_pago}</div>
                </div>
                <div>
                  <div className={`fw-medium`}>Total cuotas</div>
                  <div>{dataFilaAtencion?.pagos[0]?.cuotas}</div>
                </div>
              </div>
              <div className={`d-flex flex-column justify-content-center border gap-2  rounded-3 m-1 mb-3`}>
                {dataFilaAtencion?.pagos?.length > 0 ? (
                  <div>
                    {dataFilaAtencion?.pagos.map((pag, index) => (
                      <div
                        key={index}
                        className={`d-flex flex-column flex-sm-row justify-content-sm-evenly text-center align-items-center border bg-light`}
                      >
                        <div className={``}>
                          <div className={`fw-medium`}>Cuota</div>
                          <div>
                            {pag?.nro_cuota}/{pag?.cuotas}
                          </div>
                        </div>
                        <div>
                          <div className={`fw-medium`}>Fecha pago</div>
                          <div>{handleDate(pag?.fecha_hora_pago)}</div>
                        </div>
                        <div>
                          <div className={`fw-medium`}>Monto</div>
                          <div>${pag?.importe}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-bold text-center text-danger bg-light`}>
                    No ha sido abonado hasta el momento
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
            <Typography my={2} variant="h4" color="error" align="center" px={1}>
              Aún no fue atendido por un veterinario
            </Typography>

            <Button variant="outlined" color="info" size="large" onClick={() => handleEdit(dataFilaAtencion)}>
              Atender turno
            </Button>
          </Box>
        )}

        <ModalAlert
          text="¿Desea marcar esta atencion como pagada?"
          clickAction={() => handleAddPago()}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default ModalAtencion;
