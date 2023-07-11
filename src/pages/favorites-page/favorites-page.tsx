import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Card from '../../components/card/card';
import { AppRoute } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/selectors';
import FavoritesEmpty from '../favorites-empty-page/favorites-empty-page';

export default function FavoritesPage() {
  const favoritesOffers = useAppSelector(getFavoriteOffers);
  const favoriteCityNames = Array.from(new Set(favoritesOffers.map((it) => it.city.name)));

  if (favoritesOffers.length > 0) {
    return (
      <div className='page'>
        <Helmet>
          <title>Favorites</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favoriteCityNames.map((it) => (
                  <li className="favorites__locations-items" key={it}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link
                          to={'/'}
                        >
                          <div className="locations__item-link">
                            <span>{it}</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        favoritesOffers
                          .filter((el) => el.city.name === it)
                          .map((item) => (
                            <Card
                              key={item.id}
                              offer={item}
                            />
                          ))
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <footer className='footer container'>
          <Link to={AppRoute.Main}>
            <div className='footer__logo-link'>
              <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
            </div>
          </Link>
        </footer>
      </div>
    );
  } else {
    return (<FavoritesEmpty />);
  }
}
