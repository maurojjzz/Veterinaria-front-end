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


export const handleDate = (fecha)=>{
  if(fecha){
    return new Date(fecha).toLocaleString();
  }else{
    return 'No'
  }
}


