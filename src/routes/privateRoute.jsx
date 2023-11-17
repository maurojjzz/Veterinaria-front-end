import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  let role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  return (
    <div>
      <Route
        {...rest}
        render={(routeProp) => {
          if (token && role === rest.role) {
            return <RouteComponent {...routeProp} />;
          }
          if ((!role || role !== rest.role || !token)) {
            switch (role) {
              case (role = "Admin"):
                return <Redirect to={"/admin/not-allowed"} />;
              case (role = "Usuario"):
                return <Redirect to={"/user/not-allowed"} />;
              case (role = "Veterinario"):
                return <Redirect to={"/vet/not-allowed"} />;
              default:
                <Redirect to={"/auth/login"} />;
                break;
            }
          }
          return <Redirect to={"/auth/login"} />;
        }}
      />
    </div>
  );
};

export default PrivateRoute;
