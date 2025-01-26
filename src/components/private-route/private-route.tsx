import {Navigate} from 'react-router-dom';
import {RoutePath} from '../../routes';
import {useAppSelector} from '../../store/use-app-selector';
import {getIsAuthed} from '../../store/slices/user/selectors';

type PrivateRouteProps = {
  navigatePath: RoutePath;
  children: JSX.Element;
}

function PrivateRoute({navigatePath, children}: PrivateRouteProps): JSX.Element {
  const isAuthed = useAppSelector(getIsAuthed);

  return (
    isAuthed ? children : <Navigate to={navigatePath} />
  );
}

export default PrivateRoute;
