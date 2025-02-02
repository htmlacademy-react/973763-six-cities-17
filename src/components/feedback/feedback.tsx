import React, {ChangeEvent, FormEvent, useState} from 'react';
import {ReviewTextLength, RatingTitles} from '../../const';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {postReviewAction, fetchReviewsAction} from '../../store/api-actions';

type FormDataType = {
  rating: number;
  review: string;
};

function Feedback(): JSX.Element {

  const initialState: FormDataType = {
    rating: 0,
    review: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const isFormValid = ({rating, review}: FormDataType) => review.length >= ReviewTextLength.MIN && review.length <= ReviewTextLength.MAX && rating >= 1;
  const isValid = isFormValid(formData);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: keyof FormDataType) => {
    setFormData((prev) => ({...prev, [inputName]: e.target.value}));
  };

  const params = useParams();
  const offerId = params.id ?? '';
  const dispatch = useAppDispatch();

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormDisabled(true);
    dispatch(
      postReviewAction({
        id: offerId,
        rating: +formData.rating,
        comment: formData.review
      })).unwrap().then(() => {
      setFormData(initialState);
      dispatch(fetchReviewsAction(offerId));
    }).finally(() => {
      setIsFormDisabled(false);
    });
  };

  return (
    <form onSubmit={handleSubmitForm} className="reviews__form form" action="#" method="post" data-testid="feedback-container">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RatingTitles.map((rating) => (
          <React.Fragment key={rating.value}>
            <input
              onChange={(e) => handleChangeValue(e,'rating')}
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={rating.value}
              id={`${rating.value}-stars`}
              type="radio"
              disabled={isFormDisabled}
              data-testid={`${rating.value}-stars`}
            />
            <label
              htmlFor={`${rating.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating.title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>))}
      </div>
      <textarea
        value={formData.review}
        onChange={(e) => handleChangeValue(e,'review')}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isFormDisabled}
        data-testid='reviewElement'
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{ReviewTextLength.MIN} characters</b> (you typed {formData.review.length} of {ReviewTextLength.MAX} max).
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isFormDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Feedback;
