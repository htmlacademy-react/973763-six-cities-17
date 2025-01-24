import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {appSlice} from './slices//app/app';
import {offerSlice} from './slices//app/app';
import {reviewSlice} from './slices//app/app';
import {userSlice} from './slices//app/app';


export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
