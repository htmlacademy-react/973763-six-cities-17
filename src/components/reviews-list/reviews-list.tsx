import ReviewsItem from '../reviews-item/reviews-item';
import {Review} from '../../types';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewsItem review={review} key={review.id}/>)}
      </ul>
    </>
  );
}

export default ReviewsList;
