import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import ErrorPage from '../../pages/error/error';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import {RoutePath} from '../../routes';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../store/use-app-selector';
import {getAuthorizationStatus, getIsAppLoading} from '../../store/selectors';
import Spinner from '../../components/spinner/spinner';
import {useEffect} from 'react';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {fetchOffersAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsAppLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  // useEffect(() => {
  //   if (authorizationStatus !== AuthorizationStatus.UNKNOWN) {
  //     dispatch(fetchOffersAction());
  //   }
  //
  // }, [dispatch, authorizationStatus]);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={RoutePath.INDEX} errorElement={<ErrorPage/>}>
        <Route index element={<MainPage/>}/>
        <Route path={RoutePath.OFFER} element={<OfferPage/>}/>
        <Route path={RoutePath.FAVORITES} element={
          <PrivateRoute navigatePath={RoutePath.LOGIN} >
            <FavoritesPage/>
          </PrivateRoute>
        }
        />
        <Route path={RoutePath.LOGIN} element={<LoginPage/>}/>
        <Route path={RoutePath.NOT_FOUND} element={<ErrorPage/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
