import { useEffect, useState } from "react";
import { Box, Avatar, Typography, IconButton, Tooltip } from "@mui/material";
import { getRazas } from "../../../../../redux/razas/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import { calcularEdad } from "../../../../../Functions/utiities.js";
import { deleteMascota } from "../../../../../redux/mascotas/thunks.js";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import { ModalAlert } from "../../../../Shared";

const Celda = ({ item, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataAnimal, setDataAnimal] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { razas } = useSelector((state) => state.razas);

  const getPic = () => {
    switch (dataAnimal?.especie?.descripcion) {
      case "Canino":
        return "dog.png";
      case "Reptil":
        return "reptile.png";
      case "Ave":
        return "bird.png";
      case "Felino":
        return "cat.png";
      case "Pez":
        return "fish.png";
      default:
        return "paw.png";
    }
  };

  useEffect(() => {
    dispatch(getRazas());
  }, [dispatch]);

  useEffect(() => {
    setDataAnimal(razas.find((r) => r.id === item.raza));
  }, [item.raza, razas]);

  const goBackToTable = (message, type = "Success") => {
    setTimeout(() => {
      history.push("/user/mascotas", { state: { message, type } });
    }, 2000);
  };

  const handleEdit = (mascota) => {
    history.push(`/user/mascotas/form/${mascota.id}`, { params: { ...mascota } });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteMascota(id));
      setData((prevData) => (Array.isArray(prevData) ? prevData.filter((masco) => masco.id !== id) : []));
      goBackToTable("Mascota eliminada correctamente", "Info");
    } catch (error) {
      console.log(error);
      goBackToTable("Error al eliminar mascota", "Error");
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid rgba(95, 93, 93, 0.4)",
        borderRadius: "5px",
        minWidth: "250px",
        maxWidth: "350px",
        width: "90%",
        height: "300px",
        boxShadow: "4px 3px 8px 0px rgba(95, 93, 93, 0.47)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: "10px",
        }}
      >
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: "#A0D090",
            "& img": {
              width: "80px",
              height: "80px",
            },
          }}
          alt="avatar pet icon"
          src={`${process.env.PUBLIC_URL}/assets/images/IconsPets/${getPic()}`}
        />
      </Box>
      <Typography
        variant="h5"
        component={"h2"}
        sx={{
          textAlign: "center",
        }}
      >
        {item?.nombre}
      </Typography>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Sexo:
            </Typography>

            <Typography variant="body1">{item?.sexo}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Edad:
            </Typography>

            <Typography variant="body1">{calcularEdad(item?.fecha_nacimiento)}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Especie:
            </Typography>

            <Typography variant="body1"> {dataAnimal?.especie?.descripcion} </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Raza:
            </Typography>

            <Typography variant="body1"> {dataAnimal?.descripcion} </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Tooltip title="Editar mascota">
          <IconButton
            size="large"
            onClick={() => {
              handleEdit(item);
            }}
          >
            <ModeEditIcon color="info" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Borrar mascota">
          <IconButton
            size="large"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </Box>
      <ModalAlert
        text="¿Desea eliminar la mascota?"
        clickAction={() => handleDelete(item.id)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default Celda;
