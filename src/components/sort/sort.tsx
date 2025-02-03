import {SortOptions} from '../../const';
import {SortType} from '../../types';
import {useState} from 'react';
import { useAppDispatch } from '../../store/use-app-dispatch';
import {useAppSelector} from '../../store/use-app-selector';
import {getSortOption} from '../../store/slices/app/selectors';
import {setOfferSortOption} from '../../store/slices/app/app';

function Sort(): JSX.Element {
  const [isBlockOpened, setBlockState] = useState(false);
  const handleOpenSortBlock = () => {
    setBlockState(!isBlockOpened);
  };

  const dispatch = useAppDispatch();
  const sortOption = useAppSelector(getSortOption);

  const handleSortClick = (sortType: SortType) => {
    dispatch(setOfferSortOption(sortType));
    setBlockState(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" data-testid='sort-container'>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleOpenSortBlock} data-testid='sort-type-element'>
        &nbsp;{sortOption.value}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isBlockOpened && 'places__options--opened'}`} data-testid='sort-options-block'>
        {SortOptions.map((sortType) => <li className={`places__option ${sortOption === sortType ? 'places__option--active' : ''}`} tabIndex={0} key={sortType.name} onClick={() => handleSortClick(sortType)}>{sortType.value}</li>)}
      </ul>
    </form>
  );
}

export default Sort;
