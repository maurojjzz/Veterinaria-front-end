import React , {Suspense} from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute.jsx';

const AuthRoute = React.lazy(() => import('./auth'));
const AdminRoutes = React.lazy(()=> import('./admin'))
const UsuarioRoutes = React.lazy(()=> import('./usuario'))


const Routes = () => {
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <PrivateRoute path="/admin" role="Admin" component={AdminRoutes}/>
            <PrivateRoute path="/user" role="Usuario" component={UsuarioRoutes}/>
            <PrivateRoute path="/vet" role="Veterinario" />
            <Route path="/auth" component={AuthRoute} />
            <Redirect to="/auth" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
}

export default Routes
