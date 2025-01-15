import {createReducer} from '@reduxjs/toolkit';
import {setOffers, setActiveCityName, changeOfferSortOption, setOffersLoadingStatus} from './action';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, LoadingStatus} from '../const';
import {InitialState} from './types.ts';
import {fetchOffersAction} from './api-actions';

const initialState: InitialState = {
  offers: [],
  activeCityName: DEFAULT_CITY_NAME,
  offerSortOption: DEFAULT_SORT_OPTION,
  offersLoadingStatus: LoadingStatus.NotLoaded
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffersAction.pending, (state) => {
      state.offersLoadingStatus = LoadingStatus.Loading;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersLoadingStatus = LoadingStatus.Loaded;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersLoadingStatus = LoadingStatus.Failed;
    })
    // .addCase(setOffers, (state, action) => {
    //   state.offers = action.payload;
    // })
    .addCase(setActiveCityName, (state, action) => {
      state.activeCityName = action.payload;
    })
    .addCase(changeOfferSortOption, (state, action) => {
      state.offerSortOption = action.payload;
    });
    // .addCase(setOffersLoadingStatus, (state, action) => {
    //   state.offersLoadingStatus = action.payload;
    // });
});

export {reducer};
