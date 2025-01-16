import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {RoutePath} from '../../routes';
import {getAutorizationStatus} from '../../store/selectors';
import {useAppSelector} from '../../store/use-app-selector';

type PrivateRouteProps = {
  navigatePath: RoutePath;
  children: JSX.Element;
}

function PrivateRoute({navigatePath, children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAutorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={navigatePath} />
  );
}

export default PrivateRoute;
