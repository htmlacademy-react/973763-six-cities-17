import { createSelector } from '@reduxjs/toolkit';
import {State} from './types.ts';
import {getOffersByCity, getOffersBySortOption} from '../utils';

export const getOffers = (state: State) => state.offers;
export const getOffersLoadingStatus = (state: State) => state.offersLoadingStatus;
export const getFavoriteOffers = (state: State) => state.favoriteOffers;
export const getFavoritesLoadingStatus = (state: State) => state.favoritesLoadingStatus;
export const getActiveCityName = (state: State) => state.activeCityName;
export const getSortOption = (state: State) => state.offerSortOption;
export const getAutorizationStatus = (state: State) => state.authorizationStatus;
export const getUserData = (state: State) => state.userData;

export const getSortedOffers = createSelector(
  [getOffers, getActiveCityName, getSortOption],
  (offers, activeCityName, sortOption) => {
    const filteredOffersByActiveCity = getOffersByCity(offers, activeCityName);
    return getOffersBySortOption(filteredOffersByActiveCity, sortOption);
  }
);
