import React, { useEffect } from "react";
import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { styles } from "./AtencionesPendientesPago.module.css";

const fetchAtencionesPendientes = createAsyncThunk(
  "atencionesPendientes/fetchAtencionesPendientes",
  async () => {
    const response = await fetch("/api/atenciones-pendientes");
    if (!response.ok) {
      throw new Error("Error al obtener las atenciones pendientes.");
    }
    return await response.json();
  }
);

const atencionesPendientesSlice = createSlice({
  name: "atencionesPendientes",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAtencionesPendientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAtencionesPendientes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAtencionesPendientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const store = configureStore({
  reducer: {
    atencionesPendientes: atencionesPendientesSlice.reducer,
  },
});

const AtencionesPendientesPago = () => {
  const dispatch = useDispatch();

  const atencionesPendientes = useSelector(
    (state) => state.atencionesPendientes.data
  );
  const loading = useSelector((state) => state.atencionesPendientes.loading);
  const error = useSelector((state) => state.atencionesPendientes.error);

  useEffect(() => {
    dispatch(fetchAtencionesPendientes());
  }, [dispatch]);

  if (loading) return <p>Cargando atenciones pendientes de pago...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1>Atenciones Pendientes de Pago</h1>
      {atencionesPendientes.length > 0 ? (
        <ul className={styles.list}>
          {atencionesPendientes.map((atencion) => (
            <li key={atencion.id} className={styles.item}>
              <p><strong>Fecha:</strong> {atencion.fecha}</p>
              <p><strong>Mascota:</strong> {atencion.mascota}</p>
              <p><strong>Monto:</strong> {atencion.monto}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay atenciones pendientes de pago.</p>
      )}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AtencionesPendientesPago />
  </Provider>
);

export default App;
