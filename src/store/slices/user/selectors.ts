import {AuthorizationStatus, NameSpace} from '../../../const';
import {State} from '../../types';
import {createSelector} from '@reduxjs/toolkit';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].userData;
export const getFavoriteOffers = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].favoriteOffers;
export const getFavoritesLoadingStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].favoritesLoadingStatus;
export const getFavoriteStatusByOfferId = (state: Pick<State, NameSpace.User>, id: string) => state[NameSpace.User].favoriteOffers.findIndex((offer) => offer.id === id) !== -1;

export const getIsAuthed = createSelector(
  getAuthorizationStatus,
  (authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH
);

export const getFavoritesCities = createSelector(
  getFavoriteOffers,
  (favoriteOffers) => [...new Set(favoriteOffers.map((offer) => offer.city.name))]
);
