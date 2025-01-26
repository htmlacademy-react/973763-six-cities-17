import {createSlice} from '@reduxjs/toolkit';
import {LoadingStatus, NameSpace} from '../../../const';
import {OfferState} from '../../types';
import {fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction} from '../../api-actions';

const initialState: OfferState = {
  offers: [],
  offersLoadingStatus: LoadingStatus.NotLoaded,
  offer: null,
  offerLoadingStatus: LoadingStatus.NotLoaded,
  nearbyOffers: [],
  nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
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
        state.offers = [];
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerLoadingStatus = LoadingStatus.Loaded;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerLoadingStatus = LoadingStatus.Failed;
        state.offer = null;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.nearbyOffersLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.nearbyOffersLoadingStatus = LoadingStatus.Loaded;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffersLoadingStatus = LoadingStatus.Failed;
        state.nearbyOffers = [];
      });
  }
});
