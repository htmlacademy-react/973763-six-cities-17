import { createSelector } from '@reduxjs/toolkit';
import {State} from './types.ts';
import {getOffersByCity, getOffersBySortOption, getReviewsByDate} from '../utils';
import {AuthorizationStatus, LoadingStatus} from '../const';

export const getOffers = (state: State) => state.offers;
export const getOffersLoadingStatus = (state: State) => state.offersLoadingStatus;
export const getFavoriteOffers = (state: State) => state.favoriteOffers;
export const getFavoritesLoadingStatus = (state: State) => state.favoritesLoadingStatus;
// export const getActiveCityName = (state: State) => state.activeCityName;
// export const getSortOption = (state: State) => state.offerSortOption;
export const getAuthorizationStatus = (state: State) => state.authorizationStatus;
export const getUserData = (state: State) => state.userData;
export const getOffer = (state: State) => state.offer;
export const getOfferLoadingStatus = (state: State) => state.offerLoadingStatus;
export const getNearbyOffers = (state: State) => state.nearbyOffers;
export const getNearbyOffersLoadingStatus = (state: State) => state.nearbyOffersLoadingStatus;
export const getReviews = (state: State) => state.reviews;
export const getReviewsLoadingStatus = (state: State) => state.reviewsLoadingStatus;
export const getFavoriteStatusByOfferId = (state: State, id: string) => state.favoriteOffers.findIndex((offer) => offer.id === id) !== -1;

export const getIsAuthed = createSelector(
  getAuthorizationStatus,
  (authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH
);

export const getIsAppLoading = createSelector(
  [getOffersLoadingStatus, getAuthorizationStatus, getFavoritesLoadingStatus],
  (offersLoadingStatus, authorizationStatus, favoritesLoadingStatus) => offersLoadingStatus === LoadingStatus.Loading || authorizationStatus === AuthorizationStatus.UNKNOWN || favoritesLoadingStatus === LoadingStatus.Loading
);

export const getIsOfferPageLoading = createSelector(
  [getOfferLoadingStatus, getNearbyOffersLoadingStatus, getReviewsLoadingStatus],
  (offerLoadingStatus, nearbyOffersLoadingStatus, reviewsLoadingStatus) => offerLoadingStatus === LoadingStatus.Loading || nearbyOffersLoadingStatus === LoadingStatus.Loading || reviewsLoadingStatus === LoadingStatus.Loading
);

export const getSortedOffers = createSelector(
  [getOffers, getActiveCityName, getSortOption],
  (offers, activeCityName, sortOption) => {
    const filteredOffersByActiveCity = getOffersByCity(offers, activeCityName);
    return getOffersBySortOption(filteredOffersByActiveCity, sortOption);
  }
);

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => getReviewsByDate(reviews)
);

export const getFavoritesCities = createSelector(
  getFavoriteOffers,
  (favoriteOffers) => [...new Set(favoriteOffers.map((offer) => offer.city.name))]
);
