import {NameSpace} from '../../../const';
import {State} from '../../types';
import {createSelector} from '@reduxjs/toolkit';
import {getReviewsByDate} from '../../../utils';

export const getReviewsLoadingStatus = (state: Pick<State, NameSpace.Review>) => state[NameSpace.Review].reviewsLoadingStatus;
export const getReviews = (state: Pick<State, NameSpace.Review>) => state[NameSpace.Review].reviews;

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => getReviewsByDate(reviews)
);
