import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import ErrorPage from '../../pages/error/error';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';


import { Offer } from '../../types';
import { mockOffers } from '../../mocks/offers';
import {RoutePath} from '../../routes';
import {AuthorizationStatus} from '../../const.ts';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers?: Offer[];
}

function App({offers = mockOffers}: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.INDEX} element={<MainPage offers={offers} />}/>
        <Route path={RoutePath.OFFER} element={<OfferPage/>}/>
        <Route path={RoutePath.FAVORITES} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NO_AUTH}>
            <FavoritesPage/>
          </PrivateRoute>
        }
        />
        <Route path={RoutePath.LOGIN} element={<LoginPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
