import {createAction} from '@reduxjs/toolkit';
import {CityName, Offer} from '../types';

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setActiveCityName = createAction<CityName>('main/setActiveCityName');
