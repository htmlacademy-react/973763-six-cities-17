import {createReducer} from '@reduxjs/toolkit';
import {loadOffers, setActiveCityName, changeOfferSortOption} from './action';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION} from '../const';
import {InitialState} from './types.ts';

const initialState: InitialState = {
  offers: [],
  activeCityName: DEFAULT_CITY_NAME,
  offerSortOption: DEFAULT_SORT_OPTION
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(changeOfferSortOption, (state, action) => {
      state.offerSortOption = action.payload;
    });
});

export {reducer};
