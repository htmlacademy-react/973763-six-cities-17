import {createReducer} from '@reduxjs/toolkit';
import {setActiveCityName, setOfferSortOption} from './action';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, LoadingStatus, AuthorizationStatus} from '../const';
import {InitialState} from './types.ts';
import {checkAuthAction, fetchOffersAction, fetchFavoritesAction, toggleFavoriteAction, fetchReviewsAction, fetchNearbyOffersAction, fetchOfferAction, loginAction, logoutAction} from './api-actions';

const initialState: InitialState = {
  offers: [],
  offersLoadingStatus: LoadingStatus.NotLoaded,
  favoriteOffers: [],
  favoritesLoadingStatus: LoadingStatus.NotLoaded,
  favoritesToggleStatus: LoadingStatus.NotLoaded,
  activeCityName: DEFAULT_CITY_NAME,
  offerSortOption: DEFAULT_SORT_OPTION,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userData: null,
  offer: null,
  offerLoadingStatus: LoadingStatus.NotLoaded,
  nearbyOffers: [],
  nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
  reviews: [],
  reviewsLoadingStatus: LoadingStatus.NotLoaded
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
      state.offers = [];
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
    })
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(setOfferSortOption, (state, action) => {
      state.offerSortOption = action.payload;
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

    .addCase(fetchOfferAction.pending, (state) => {
      state.offerLoadingStatus = LoadingStatus.Loading;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.offerLoadingStatus = LoadingStatus.Loaded;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.offerLoadingStatus = LoadingStatus.Failed;
      state.offer = null;
    })

    .addCase(fetchNearbyOffersAction.pending, (state) => {
      state.nearbyOffersLoadingStatus = LoadingStatus.Loading;
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
      state.nearbyOffersLoadingStatus = LoadingStatus.Loaded;
    })
    .addCase(fetchNearbyOffersAction.rejected, (state) => {
      state.nearbyOffersLoadingStatus = LoadingStatus.Failed;
      state.nearbyOffers = [];
    })

    .addCase(fetchReviewsAction.pending, (state) => {
      state.reviewsLoadingStatus = LoadingStatus.Loading;
    })
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.reviewsLoadingStatus = LoadingStatus.Loaded;
    })
    .addCase(fetchReviewsAction.rejected, (state) => {
      state.reviewsLoadingStatus = LoadingStatus.Failed;
      state.reviews = [];
    });
});

export {reducer};
