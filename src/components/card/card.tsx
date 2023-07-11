import { FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Offer } from '../../types/types';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/selectors';
import { setOfferStatusAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

type Props = {
  offer: Offer;
  onMouseEnter?: (offerId: number) => void;
  onMouseLeave?: () => void;
}

export default function Card({ offer, onMouseEnter, onMouseLeave }: Props) {
  const location = useLocation();
  const currentOffer = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const offerId = offer.id;
  let articleClassName;
  let divClassName;
  let previewImageWidth;
  let previewImageHeight;

  switch (location.pathname) {
    case AppRoute.Main:
      articleClassName = 'cities__card place-card';
      divClassName = 'cities__image-wrapper place-card__image-wrapper';
      previewImageWidth = '260';
      previewImageHeight = '200';
      break;
    case AppRoute.Favorites:
      articleClassName = 'favorites__card place-card';
      divClassName = 'favorites__image-wrapper place-card__image-wrapper';
      previewImageWidth = '150';
      previewImageHeight = '110';
      break;
    default:
      articleClassName = 'near-places__card place-card';
      divClassName = 'near-places__image-wrapper place-card__image-wrapper';
      previewImageWidth = '260';
      previewImageHeight = '200';
  }

  const handleFavoriteButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (currentOffer === null) {
      return null;
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(setOfferStatusAction({
        status: Number(!currentOffer.isFavorite),
        id: offerId,
      }));
    } else {
      dispatch(redirectToRoute(ApiRoute.Login));
    }
  };

  function handleMouseEnter() {
    if (onMouseEnter) {
      onMouseEnter(offer.id);
    }
  }

  return (
    <article className={articleClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        offer.isPremium &&
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      }
      <div className={divClassName}>
        <Link to={`/offer/${offer.id}`} key={offer.id} >
          <img className='place-card__image' src={offer.previewImage} width={previewImageWidth} height={previewImageHeight} alt='' />
        </Link>
      </div>

      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button  ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button `} type='button' onClick={handleFavoriteButtonClick}>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        {offer.rating &&
          <div className='place-card__rating rating'>
            <div className='place-card__stars rating__stars'>
              <span style={{ 'width': `${offer.rating * 20}%` }}></span>
              <span className='visually-hidden'>Rating</span>
            </div>
          </div>}
        <Link to={`/offer/${offer.id}`} key={offer.id} >
          <h2 className='place-card__name'>
            <div>{offer.title}</div>
          </h2>
        </Link >
        <p className='place-card__type'>{offer.type}</p>
      </div>

    </article >
  );
}
