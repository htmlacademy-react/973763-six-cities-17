import {createReducer} from '@reduxjs/toolkit';
import {setActiveCityName, changeOfferSortOption, clearFavoriteOffers} from './action';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, LoadingStatus, AuthorizationStatus} from '../const';
import {InitialState} from './types.ts';
import {checkAuthAction, fetchOffersAction, fetchFavoritesAction, loginAction, logoutAction} from './api-actions';

const initialState: InitialState = {
  offers: [],
  offersLoadingStatus: LoadingStatus.NotLoaded,
  favoriteOffers: [],
  favoritesLoadingStatus: LoadingStatus.NotLoaded,
  activeCityName: DEFAULT_CITY_NAME,
  offerSortOption: DEFAULT_SORT_OPTION,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffersAction.pending, (state) => {
      state.offersLoadingStatus = LoadingStatus.Loading;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersLoadingStatus = LoadingStatus.Loaded;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersLoadingStatus = LoadingStatus.Failed;
    })
    .addCase(fetchFavoritesAction.pending, (state) => {
      state.favoritesLoadingStatus = LoadingStatus.Loading;
    })
    .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favoriteOffers = action.payload;
      state.favoritesLoadingStatus = LoadingStatus.Loaded;
    })
    .addCase(fetchFavoritesAction.rejected, (state) => {
      state.favoritesLoadingStatus = LoadingStatus.Failed;
    })
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(changeOfferSortOption, (state, action) => {
      state.offerSortOption = action.payload;
    })
    .addCase(clearFavoriteOffers, (state) => {
      state.favoriteOffers = [];
      state.favoritesLoadingStatus = LoadingStatus.NotLoaded;
    })
    .addCase(checkAuthAction.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.UNKNOWN;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
      state.userData = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
      state.userData = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userData = null;
    });
});

export {reducer};
