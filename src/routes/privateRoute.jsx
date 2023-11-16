// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const privateRoute = ({ component: RouteComponent, ...rest }) => {
//   return (
//     <div>
//       <Route
//       {...rest}
//       render={(routeProp) => {
//         if (token && role === rest.role) {
//           return <RouteComponent {...routeProp} />;
//         }
//         if ((!role || role !== rest.role || !token) && !error) {
//           switch (role) {
//             case (role = 'MEMBER'):
//               return <Redirect to={'/member/not-allowed'} />;
//             case (role = 'ADMIN'):
//               return <Redirect to={'/admin/not-allowed'} />;
//             case (role = 'SUPER_ADMIN'):
//               return <Redirect to={'/superAdmin/not-allowed'} />;
//             case (role = 'TRAINER'):
//               return <Redirect to={'/trainer/not-allowed'} />;
//             default:
//               <Redirect to={'/auth/login'} />;
//               break;
//           }
//         }
//         return <Redirect to={'/auth/login'} />;
//       }}
//     />
//     </div>
//   )
// }

// export default privateRoute
