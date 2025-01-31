import {LoadingStatus, NameSpace} from '../../../const';
import { getReviewsLoadingStatus, getReviews, getSortedReviews } from './selectors';
import {makeFakeReview} from '../../../mocks/mocks';

describe('Review selectors', () => {
  const state = {
    [NameSpace.Review]: {
      reviews: [{
        ...makeFakeReview(),
        id: '1',
        date: '2019-05-08T14:13:56.569Z',
      },
      {
        ...makeFakeReview(),
        id: '2',
        date: '2024-05-08T14:13:56.569Z',
      },
      ],
      reviewsLoadingStatus: LoadingStatus.NotLoaded
    },
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Review] ;
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return reviewsLoadingStatus from state', () => {
    const { reviewsLoadingStatus } = state[NameSpace.Review] ;
    const result = getReviewsLoadingStatus(state);
    expect(result).toBe(reviewsLoadingStatus);
  });

  it('should return sorted Reviews by date from new to old from state', () => {
    const result = getSortedReviews(state);
    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('1');
  });
});
