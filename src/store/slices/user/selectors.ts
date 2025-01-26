import {AuthorizationStatus, NameSpace} from '../../../const';
import {State} from '../../types';
import {createSelector} from '@reduxjs/toolkit';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State) => state[NameSpace.User].userData;
export const getFavoriteOffers = (state: State) => state[NameSpace.User].favoriteOffers;
export const getFavoritesLoadingStatus = (state: State) => state[NameSpace.User].favoritesLoadingStatus;
export const getFavoriteStatusByOfferId = (state: State, id: string) => state[NameSpace.User].favoriteOffers.findIndex((offer) => offer.id === id) !== -1;

export const getIsAuthed = createSelector(
  getAuthorizationStatus,
  (authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH
);

export const getFavoritesCities = createSelector(
  getFavoriteOffers,
  (favoriteOffers) => [...new Set(favoriteOffers.map((offer) => offer.city.name))]
);
