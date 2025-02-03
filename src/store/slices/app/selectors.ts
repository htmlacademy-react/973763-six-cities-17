import {NameSpace} from '../../../const';
import {State} from '../../types';

export const getActiveCityName = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].activeCityName;
export const getSortOption = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].offerSortOption;
