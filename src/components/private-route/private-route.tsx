import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps){
  const hasAccess = true;

  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
