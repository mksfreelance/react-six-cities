import { FormEvent, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRoute, MAX_LENGTH_OF_REVIEW, MIN_LENGTH_OF_REVIEW } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';

const commentRating = [5, 4, 3, 2, 1];
const emptyFormState = {
  rating: '',
  comment: '',
};

export default function CommentSendForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyFormState);

  if (!id) {
    navigate(`${ApiRoute.Offers}`);
  }

  const fieldChangeHandle = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id && dispatch(addReviewAction({
      id,
      comment: formData.comment,
      rating: formData.rating
    }));
    setFormData(emptyFormState);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review </label>
      <div className="reviews__rating-form form__rating">
        {
          commentRating.map((rating) => (
            <Fragment key={rating}>
              <input className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars"`} type="radio" checked={Number(formData.rating) === rating} onChange={fieldChangeHandle} />
              <label htmlFor={`${rating}-stars"`} className="reviews__rating-label form__rating-label" title={`${rating}-stars`}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.comment} onChange={fieldChangeHandle} maxLength={MAX_LENGTH_OF_REVIEW} minLength={MIN_LENGTH_OF_REVIEW}>
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
          You have entered {formData.comment.length} characters.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            formData.rating === ''
            || formData.comment.length < MIN_LENGTH_OF_REVIEW
            || formData.comment.length > MAX_LENGTH_OF_REVIEW
          }
        >Submit
        </button>
      </div>
    </form>
  );
}
