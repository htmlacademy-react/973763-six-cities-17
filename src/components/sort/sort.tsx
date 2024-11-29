import { SortOptions } from '../../const';
import {SortType} from '../../types';

type SortProps = {
  sortOptions?: SortType[];
}

function Sort({sortOptions = SortOptions}: SortProps): JSX.Element {

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortOptions[0].value}
        <svg className="places__sorting-arrow" width="{7}" height="{4}">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortOptions.map((sortItem) => <li className="places__option places__option--active" tabIndex={0} key={sortItem.name}>{sortItem.value}</li>)}
      </ul>
    </form>
  );
}

export default Sort;
