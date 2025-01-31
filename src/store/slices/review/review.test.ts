import {makeFakeReview} from '../../../mocks/mocks';
import {fetchReviewsAction} from '../../api-actions';
import {reviewSlice} from './review';
import {LoadingStatus} from '../../../const';
import {ReviewState} from '../../types';
import {Review} from '../../../types.ts';

describe('Review Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: ReviewState = {
      reviews: [],
      reviewsLoadingStatus: LoadingStatus.NotLoaded
    };
    const result = reviewSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: ReviewState = {
      reviews: [],
      reviewsLoadingStatus: LoadingStatus.NotLoaded
    };
    const result = reviewSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "reviewsLoadingStatus" to "LoadingStatus.Loading" with "fetchReviewsAction.pending"', () => {
    const expectedState: ReviewState = {
      reviews: [],
      reviewsLoadingStatus: LoadingStatus.Loading
    };
    const result = reviewSlice.reducer(undefined, fetchReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" and "reviewsLoadingStatus" to "LoadingStatus.Loaded" with "fetchReviewsAction.fulfilled"', () => {
    const mockReviews = Array<Review>(10).fill(makeFakeReview());
    const expectedState: ReviewState = {
      reviews: mockReviews,
      reviewsLoadingStatus: LoadingStatus.Loaded
    };
    const result = reviewSlice.reducer(undefined, fetchReviewsAction.fulfilled(mockReviews, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to empty array and "reviewsLoadingStatus" to "LoadingStatus.Failed" with "fetchReviewsAction.rejected"', () => {
    const expectedState: ReviewState = {
      reviews: [],
      reviewsLoadingStatus: LoadingStatus.Failed
    };
    const result = reviewSlice.reducer(undefined, fetchReviewsAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
