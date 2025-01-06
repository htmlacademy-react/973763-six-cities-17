import {createAction} from '@reduxjs/toolkit';
import {CityName, Offer, SortType} from '../types';

export const setOffers = createAction<Offer[]>('data/setOffers');
export const setActiveCityName = createAction<CityName>('main/setActiveCityName');
export const changeOfferSortOption = createAction<SortType>('main/changeOfferSortOption');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
