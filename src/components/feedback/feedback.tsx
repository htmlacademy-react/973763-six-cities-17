import {ChangeEvent, FormEvent, useState} from 'react';
import {ReviewTextLength} from '../../const.ts';

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
  const [isButtonFormDisabled, setIsButtonFormDisabled] = useState(true);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: keyof FormDataType) => {
    setFormData((prev) => (
      {
        ...prev,
        [inputName]: e.target.value
      }
    ));

    if (formData.review.length > ReviewTextLength.MIN && formData.review.length < ReviewTextLength.MAX) {
      setIsButtonFormDisabled(false);
    }
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(initialState);
    setIsButtonFormDisabled(true);
  };

  return (
    <form onSubmit={handleSubmitForm} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          onChange={(e) => handleChangeValue(e,'rating')}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          onChange={(e) => handleChangeValue(e,'rating')}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          onChange={(e) => handleChangeValue(e,'rating')}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          onChange={(e) => handleChangeValue(e,'rating')}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          onChange={(e) => handleChangeValue(e,'rating')}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea
        value={formData.review}
        onChange={(e) => handleChangeValue(e,'review')}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonFormDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Feedback;
