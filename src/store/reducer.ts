import {createReducer} from '@reduxjs/toolkit';
// import {loadOffers, setActiveCityName} from './action';
import {setActiveCityName} from './action';
import {mockOffers} from '../mocks/offers';
import {DEFAULT_CITY_NAME} from '../const';
import {InitialState} from './types.ts';

const initialState: InitialState = {
  offers: mockOffers,
  activeCityName: DEFAULT_CITY_NAME,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(loadOffers, (state, action) => {
    //   state.offers = action.payload;
    // })
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    });
});

export {reducer};
