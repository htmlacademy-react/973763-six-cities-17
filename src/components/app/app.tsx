import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import ErrorPage from '../../pages/error/error';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import {RoutePath} from '../../routes';
import {AuthorizationStatus} from '../../const';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';


function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={RoutePath.INDEX} errorElement={<ErrorPage/>}>
        <Route index element={<MainPage/>}/>
        <Route path={RoutePath.OFFER} element={<OfferPage/>}/>
        <Route path={RoutePath.FAVORITES} element={
          <PrivateRoute navigatePath={RoutePath.LOGIN} authorizationStatus={AuthorizationStatus.AUTH}>
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
