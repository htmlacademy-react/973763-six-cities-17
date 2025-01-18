import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './types.ts';
import {Offer, AuthData, UserData} from '../types';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../const';

type AsyncThunkApiType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, AsyncThunkApiType>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, AsyncThunkApiType>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData | null, undefined, AsyncThunkApiType>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data ?? null;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, AsyncThunkApiType>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkApiType>(
  'user/logout',
  async (_arg, {extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
