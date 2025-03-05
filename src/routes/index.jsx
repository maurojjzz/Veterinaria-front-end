import React, { Suspense } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./privateRoute.jsx";
import { Loader } from "../Components/Shared";
import { logout } from "../redux/auth/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const AuthRoute = React.lazy(() => import("./auth"));
const AdminRoutes = React.lazy(() => import("./admin"));
const UsuarioRoutes = React.lazy(() => import("./usuario"));

const Routes = () => {
  const { sessionExpired } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Dialog open={sessionExpired} maxWidth="xs" fullWidth>
        <DialogTitle>Sesión Expirada</DialogTitle>
        <DialogContent>Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.</DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(logout())} color="primary" variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute path="/admin" role="Admin" component={AdminRoutes} />
          <PrivateRoute path="/user" role="Usuario" component={UsuarioRoutes} />
          <PrivateRoute path="/vet" role="Veterinario" />
          <Route path="/auth" component={AuthRoute} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
