import { store } from '../store';
import {CityName, SortType, Offer, UserData, OfferDetail, Review} from '../types';
import {LoadingStatus, AuthorizationStatus} from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppState = {
  activeCityName: CityName;
  offerSortOption: SortType;
}

export type OfferState = {
  offers: Offer[];
  offersLoadingStatus: LoadingStatus;
  offer: OfferDetail | null;
  offerLoadingStatus: LoadingStatus;
  nearbyOffers: Offer[];
  nearbyOffersLoadingStatus: LoadingStatus;
}

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  favoriteOffers: Offer[];
  favoritesLoadingStatus: LoadingStatus;
  favoritesToggleStatus: LoadingStatus;
}

export type ReviewState = {
  reviews: Review[];
  reviewsLoadingStatus: LoadingStatus;
}
