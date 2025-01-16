import {createAction} from '@reduxjs/toolkit';
import {CityName, SortType} from '../types';

export const setActiveCityName = createAction<CityName>('main/setActiveCityName');
export const changeOfferSortOption = createAction<SortType>('main/changeOfferSortOption');
export const clearFavoriteOffers = createAction('data/clearFavoriteOffers');
