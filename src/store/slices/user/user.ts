import { createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, LoadingStatus, NameSpace} from '../../../const';
import {UserState} from '../../types';
import {
  checkAuthAction,
  fetchFavoritesAction,
  loginAction,
  logoutAction,
  toggleFavoriteAction
} from '../../api-actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userData: null,
  favoriteOffers: [],
  favoritesLoadingStatus: LoadingStatus.NotLoaded,
  favoritesToggleStatus: LoadingStatus.NotLoaded,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
      .addCase(loginAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.UNKNOWN;
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
        state.favoriteOffers = [];
        state.favoritesLoadingStatus = LoadingStatus.NotLoaded;
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
        state.favoriteOffers = [];
      })
      .addCase(toggleFavoriteAction.pending, (state) => {
        state.favoritesToggleStatus = LoadingStatus.Loading;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        state.favoritesToggleStatus = LoadingStatus.Loaded;
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          const offerIndex = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
          state.favoriteOffers.splice(offerIndex, 1);
        }
      })
      .addCase(toggleFavoriteAction.rejected, (state) => {
        state.favoritesToggleStatus = LoadingStatus.Failed;
      });
  }
});
