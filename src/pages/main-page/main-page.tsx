
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../../components/card/card';
import HeaderNav from '../../components/header-nav/header-nav';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Sorting from '../../components/sorting/sorting';
import { AuthorizationStatus, SortType } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import { setOffers } from '../../store/offers-slice';
import { getSelectedCity, getOffersLoading, getCityOffers, getAuthorizationStatus } from '../../store/selectors';


export default function MainPage() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const cityOffers = useAppSelector(getCityOffers);
  const selectedCity = useAppSelector(getSelectedCity);
  const loading = useAppSelector(getOffersLoading);
  const dispatch = useAppDispatch();
  const [activeOffer, setActiveOffer] = useState<number | undefined>();

  const handleMouseEnter = (offerId: number) => {
    setActiveOffer(offerId);
  };
  const handleMouseLeave = () => {
    setActiveOffer(undefined);
  };

  const sortOffers = (sortBy: keyof typeof SortType): void => {
    let sortedOffersBySortType;
    switch (sortBy) {
      case SortType.Popular:
        sortedOffersBySortType = cityOffers.filter((it) => it.city.name === selectedCity);
        break;
      case SortType.PriceLowToHigh:
        sortedOffersBySortType = [...cityOffers].sort((a, b) => a.price - b.price);
        break;
      case SortType.PriceHighToLow:
        sortedOffersBySortType = [...cityOffers].sort((a, b) => b.price - a.price);
        break;
      case SortType.RatingHighToLow:
        sortedOffersBySortType = [...cityOffers].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedOffersBySortType = cityOffers.filter((it) => it.city.name === selectedCity);
    }
    dispatch(setOffers(sortedOffersBySortType));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
    dispatch(fetchOffersAction());
  }, [dispatch, authorizationStatus]
  );

  return (
    <div className='page page--gray page--main' >
      <Header />
      <Helmet>
        <title>Список предлоджений</title>
      </Helmet>
      <main className='page__main page__main--index'>

        <HeaderNav />

        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{cityOffers.length} places to stay in {`${selectedCity.charAt(0).toUpperCase()}${selectedCity.slice(1)}`}</b>

              <Sorting sortOffers={sortOffers} />

              <div className='cities__places-list places__list tabs__content'>
                {loading && <div>Loading in progress...</div>}
                {
                  cityOffers.map((offer) => (
                    <Card
                      key={offer.id}
                      offer={offer}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))
                }
              </div>
            </section>
            <div className='cities__right-section'>
              <Map
                offers={cityOffers}
                selectedPoint={activeOffer}
                elementSelector={'cities__map map'}
              />
            </div>
          </div>
        </div>
      </main>
    </div >
  );
}
