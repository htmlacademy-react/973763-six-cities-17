import {NameSpace} from '../../../const';
import {State} from '../../types';
import {createSelector} from '@reduxjs/toolkit';
import {getReviewsByDate} from '../../../utils';

export const getReviewsLoadingStatus = (state: State) => state[NameSpace.Review].reviewsLoadingStatus;
export const getReviews = (state: State) => state[NameSpace.Review].reviews;

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => getReviewsByDate(reviews)
);
