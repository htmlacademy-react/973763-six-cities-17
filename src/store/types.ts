import { store } from '../store';
import {CityName, SortType, Offer} from '../types';
import {LoadingStatus} from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState = {
  offers: Offer[];
  activeCityName: CityName;
  offerSortOption: SortType;
  offersLoadingStatus: LoadingStatus;
}
