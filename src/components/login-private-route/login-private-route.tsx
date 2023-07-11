import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const/const';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function LoginPrivateRoute(props: Props): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus !== AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}

export default LoginPrivateRoute;
