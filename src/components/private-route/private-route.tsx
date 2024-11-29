import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {RoutePath} from '../../routes';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={RoutePath.LOGIN} />
  );
}

export default PrivateRoute;
