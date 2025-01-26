import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {appSlice} from './slices/app/app';
import {offerSlice} from './slices/offer/offer';
import {reviewSlice} from './slices/review/review';
import {userSlice} from './slices/user/user';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
