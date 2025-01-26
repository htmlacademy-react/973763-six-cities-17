import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, NameSpace} from '../../../const';
import {CityName, SortType} from '../../../types';
import {AppState} from '../../types';

const initialState: AppState = {
  activeCityName: DEFAULT_CITY_NAME,
  offerSortOption: DEFAULT_SORT_OPTION,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveCityName: (state, action: PayloadAction<CityName>) => {
      state.activeCityName = action.payload;
    },
    setOfferSortOption: (state, action: PayloadAction<SortType>) => {
      state.offerSortOption = action.payload;
    },
  }
});

export const { setActiveCityName, setOfferSortOption } = appSlice.actions;
