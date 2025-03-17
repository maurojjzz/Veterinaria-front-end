import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridWeek from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from "react-redux";
import { getAtenciones } from "../../../../redux/atenciones/thunks.js";
import ModalCalendario from "./ModalCalendario/ModalCalendario";

const Calendario = () => {
  const [eventos, setEventos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width:600px)");

  const { atenciones } = useSelector((state) => state.atenciones);

  useEffect(() => {
    dispatch(getAtenciones());
  }, [dispatch]);

  useEffect(() => {
    if (atenciones.length > 0) {
      console.log(atenciones);
      const eventosFormateados = atenciones.map((turno) => ({
        id: turno?.id,
        title: `Atención - ${turno?.mascota?.nombre}`,
        start: turno?.fecha_hora_atencion,
        color: turno?.veterinario ? "#1BBCB6" : "#bc331b",
        atencionData: turno,

      }));
      setEventos(eventosFormateados);
    }
  }, [atenciones]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        height: "calc(100vh - 75px)",
        position: "relative",
        backgroundColor: "white",
        "@media (min-width:767px)": {
          height: "auto",
          marginTop: "-75px",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          justifyContent: "flex-start",
        }}
      >
        Calendario
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, timeGridWeek]}
        themeSystem="standard"
        initialView="dayGridMonth"
        locale={"es"}
        events={eventos}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "prev,next today",
          center: "title",
        }}
        titleFormat={
          isMobile ? { year: "numeric", month: "short" } : { year: "numeric", month: "short", day: "numeric" }
        }
        contentHeight={isMobile ? "auto" : "auto"}
        eventClick={(info) => {
          setSelectedEvent(info.event);
          setOpenModal(true);
        }}
        dateClick={(info) => {
          const calendarApi = info.view.calendar;
          calendarApi.changeView("timeGridDay", info.dateStr);
        }}
      />
      <Box
        sx={{
          mt: "20px",
          maxWidth: "330px",
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              height: "20px",
              width: "20px",
              backgroundColor: "#1BBCB6",
              borderRadius: "50%",
            }}
          />
          <Typography variant="h6">Atendido</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              height: "20px",
              width: "20px",
              backgroundColor: "#bc331b",
              borderRadius: "50%",
            }}
          />
          <Typography variant="h6">Sin atender</Typography>
        </Box>
      </Box>
      {openModal && (
         <ModalCalendario  onClose={() => setOpenModal(false)}  selectedEvent={selectedEvent} /> 
      )}
      
    </Box>
  );
};

export default Calendario;
