import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {RoutePath} from '../../routes';

type PrivateRouteProps = {
  navigatePath: RoutePath;
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({navigatePath, authorizationStatus, children}: PrivateRouteProps): JSX.Element {

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={navigatePath} />
  );
}

export default PrivateRoute;
