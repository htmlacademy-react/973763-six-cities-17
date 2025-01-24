import { store } from '../store';
import {CityName, SortType, Offer, UserData, OfferDetail, Review} from '../types';
import {LoadingStatus, AuthorizationStatus} from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState = {
  offers: Offer[];
  offersLoadingStatus: LoadingStatus;
  favoriteOffers: Offer[];
  favoritesLoadingStatus: LoadingStatus;
  favoritesToggleStatus: LoadingStatus;
  activeCityName: CityName;
  offerSortOption: SortType;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  offer: OfferDetail | null;
  offerLoadingStatus: LoadingStatus;
  nearbyOffers: Offer[];
  nearbyOffersLoadingStatus: LoadingStatus;
  reviews: Review[];
  reviewsLoadingStatus: LoadingStatus;
}
