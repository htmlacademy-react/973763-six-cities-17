import { describe, it, expect } from 'vitest';
import {appSlice, setActiveCityName, setOfferSortOption } from './app';
import {CITIES_NAMES, DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, SortOptions} from '../../../const';

describe('App Slice', () => {
  const initialState = {
    activeCityName: DEFAULT_CITY_NAME,
    offerSortOption: DEFAULT_SORT_OPTION,
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const result = appSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set active city with "setActiveCityName" action', () => {
    const newCity = CITIES_NAMES[1];
    const action = setActiveCityName(newCity);
    const expectedState = { ...initialState, activeCityName: newCity };

    const result = appSlice.reducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('should set current sort option with "setOfferSortOption" action', () => {
    const newSort = SortOptions[1];
    const action = setOfferSortOption(newSort);
    const expectedState = { ...initialState, offerSortOption: newSort };
    const result = appSlice.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
