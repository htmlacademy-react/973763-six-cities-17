import {AuthorizationStatus, LoadingStatus, NameSpace} from '../../../const';
import {State} from '../../types';
import {createSelector} from '@reduxjs/toolkit';
import {getReviewsLoadingStatus} from '../review/selectors';
import {getAuthorizationStatus, getFavoritesLoadingStatus} from '../user/selectors';
import {getActiveCityName, getSortOption} from '../app/selectors';
import {getOffersByCity, getOffersBySortOption} from '../../../utils.ts';

export const getOffers = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offers;
export const getOffersLoadingStatus = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offersLoadingStatus;
export const getOffer = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offer;
export const getOfferLoadingStatus = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerLoadingStatus;
export const getNearbyOffers = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearbyOffers;
export const getNearbyOffersLoadingStatus = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearbyOffersLoadingStatus;

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
