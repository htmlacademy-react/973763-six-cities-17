import {createAction} from '@reduxjs/toolkit';
import {CityName} from '../types';

// export const loadOffers = createAction('data/loadOffers');
export const setActiveCityName = createAction<CityName>('main/setActiveCityName');
