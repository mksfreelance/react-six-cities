
import { useState } from 'react';
import { SortType } from '../../const/const';

type SortProps = {
  sortOffers(action: keyof typeof SortType): void;
}

function Sort({ sortOffers }: SortProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('Popular');

  const showFilterHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={showFilterHandler}>
      <span className="places__sorting-caption">Sort by  </span>
      <span className="places__sorting-type" tabIndex={0}>
        {title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom  ${isOpen ? 'places__options--opened' : ''}`}>
        <li
          className="places__option places__option--active"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.Popular);
            setTitle(evt.currentTarget.innerText);
          }}
        >
          Popular
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.PriceLowToHigh);
            setTitle(evt.currentTarget.innerText);
          }}
        >Price: low to high
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.PriceHighToLow);
            setTitle(evt.currentTarget.innerText);
          }}
        >Price: high to low
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.RatingHighToLow);
            setTitle(evt.currentTarget.innerText);
          }}
        >Top rated first
        </li>
      </ul>
    </form>
  );
}

export default Sort;
