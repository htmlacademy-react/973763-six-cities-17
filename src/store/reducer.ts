import {createReducer} from '@reduxjs/toolkit';
import {setOffers, setActiveCityName, changeOfferSortOption, setOffersLoadingStatus} from './action';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION} from '../const';
import {InitialState} from './types.ts';

const initialState: InitialState = {
  offers: [],
  activeCityName: DEFAULT_CITY_NAME,
  offerSortOption: DEFAULT_SORT_OPTION,
  offersLoadingStatus: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(changeOfferSortOption, (state, action) => {
      state.offerSortOption = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.offersLoadingStatus = action.payload;
    });
});

export {reducer};
