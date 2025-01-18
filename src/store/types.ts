import { store } from '../store';
import {CityName, SortType, Offer, UserData} from '../types';
import {LoadingStatus, AuthorizationStatus} from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState = {
  offers: Offer[];
  offersLoadingStatus: LoadingStatus;
  favoriteOffers: Offer[];
  favoritesLoadingStatus: LoadingStatus;
  activeCityName: CityName;
  offerSortOption: SortType;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}
