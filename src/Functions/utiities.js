import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    const decodedPayload = jwtDecode(token);
    return decodedPayload;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return undefined;
  }
};

export const handleDate = (fecha) => {
  if (fecha) {
    return new Date(fecha).toLocaleString("es-ES", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } else {
    return "No";
  }
};

export const formateoFecha = (date, hour) => {
  const fecha = new Date(date);

  const dia = fecha.getDate() + 1;
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  return `${anio}-${mes}-${dia} ${hour}`;
};

// export const justFecha = (date) =>{
//   const fecha = new Date(date);
//   return fecha.toISOString().split('T')[0];
// }

export const justFecha = (date) => {
  try {
    const fecha = new Date(date);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;

    return `${anio}-${mesFormateado}-${diaFormateado}`;
  } catch (error) {
    return undefined;
  }
};

export const justHour = (date) => {
  try {
    const hora = new Date(date);
    const horaFormateada = hora.toISOString().split("T")[1].substring(0, 5);
    return horaFormateada;
  } catch (error) {
    return undefined;
  }
};

export const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return "Fecha inválida";

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();

  const diferenciaAnios = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
  const diferenciaDias = hoy.getDate() - nacimiento.getDate();

  if (diferenciaAnios > 0) {
    return diferenciaAnios === 1 ? "1 año" : `${diferenciaAnios} años`;
  }

  if (diferenciaMeses > 0) {
    return diferenciaMeses === 1 ? "1 mes" : `${diferenciaMeses} meses`;
  }

  return diferenciaDias === 1 ? "1 día" : `${Math.abs(diferenciaDias)} días`;
};
