import {createSlice} from '@reduxjs/toolkit';
import {LoadingStatus, NameSpace} from '../../../const';
import {ReviewState} from '../../types';
import {fetchReviewsAction} from '../../api-actions';

const initialState: ReviewState = {
  reviews: [],
  reviewsLoadingStatus: LoadingStatus.NotLoaded
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsLoadingStatus = LoadingStatus.Loaded;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsLoadingStatus = LoadingStatus.Failed;
        state.reviews = [];
      });
  }
});
