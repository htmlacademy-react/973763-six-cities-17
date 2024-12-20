import {createAction} from '@reduxjs/toolkit';
import {CityName, Offer, SortType} from '../types';

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setActiveCityName = createAction<CityName>('main/setActiveCityName');
export const changeOfferSortOption = createAction<SortType>('main/changeOfferSortOption');
