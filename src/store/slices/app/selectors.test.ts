import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, NameSpace} from '../../../const';
import { getActiveCityName, getSortOption } from './selectors';

describe('App selectors', () => {
  const state = {
    [NameSpace.App]: {
      activeCityName: DEFAULT_CITY_NAME,
      offerSortOption: DEFAULT_SORT_OPTION,
    }
  };

  it('should return activeCityName from state', () => {
    const { activeCityName } = state[NameSpace.App] ;
    const result = getActiveCityName(state);
    expect(result).toBe(activeCityName);
  });

  it('should return offerSortOption from state', () => {
    const { offerSortOption } = state[NameSpace.App] ;
    const result = getSortOption(state);
    expect(result).toBe(offerSortOption);
  });
});
