import {NameSpace} from '../../../const';
import {State} from '../../types';

export const getActiveCityName = (state: State) => state[NameSpace.App].activeCityName;
export const getSortOption = (state: State) => state[NameSpace.App].offerSortOption;
