import {useAppDispatch} from '../../store/use-app-dispatch';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../store/use-app-selector';
import {RoutePath} from '../../routes';
import {toggleFavoriteAction} from '../../store/api-actions';
import {getFavoriteStatusByOfferId, getIsAuthed} from '../../store/slices/user/selectors';

type FavoriteButtonProps = {
  offerId: string;
  isOfferPage: boolean;
}

function FavoriteButton({offerId, isOfferPage}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthed = useAppSelector(getIsAuthed);
  const isFavorite = useAppSelector((state) => getFavoriteStatusByOfferId(state, offerId));
  const buttonClassName = isOfferPage ? 'offer' : 'place-card';

  return (
    <button
      className={`${buttonClassName}__bookmark-button ${isFavorite && isAuthed ? `${buttonClassName}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={() => {
        if (isAuthed) {
          dispatch(toggleFavoriteAction({offerId, isFavorite}));
        } else {
          navigate(RoutePath.LOGIN);
        }
      }}
      data-testid="favorite-button-container"
    >
      <svg
        className={`${buttonClassName}__bookmark-icon`}
        width={`${isOfferPage ? 31 : 18}`}
        height={`${isOfferPage ? 33 : 19}`}
      >
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">{isFavorite && isAuthed ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteButton;
