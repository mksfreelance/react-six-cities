import { useMemo, useState } from 'react';
import { CityName, cityNames } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import { changeCity } from '../../store/offers-slice';
import { getSelectedCity } from '../../store/selectors';


export default function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getSelectedCity);
  const [active, setActive] = useState(selectedCity);
  const cityNamesList = useMemo(() => Object.values(cityNames).map((city) => city.name), []);

  const changeCityHandler = (evt: React.MouseEvent<HTMLElement>, cityName: CityName) => {
    evt.preventDefault();
    dispatch(fetchOffersAction());
    dispatch(changeCity(cityName));
    setActive(cityName);
  };

  return (
    <>
      <h1 className='visually-hidden'>Cities</h1>
      <div className='tabs'>
        <section className='locations container'>
          <ul className='locations__list tabs__list' >
            {
              cityNamesList.map((cityName: CityName) => {
                const isActive = (cityName === active);
                return (
                  <li className='locations__item' key={Math.random()} onClick={(evt) => changeCityHandler(evt, cityName)} >
                    <a
                      className={`
                    locations__item-link
                    tabs__item
                    ${isActive ? 'tabs__item--active' : ''}
                  `}
                      href={`#${cityName}`}
                    >
                      <span>{cityName.toUpperCase()}</span>
                    </a>
                  </li>
                );
              }
              )
            }
          </ul>
        </section>
      </div>
    </>
  );
}
