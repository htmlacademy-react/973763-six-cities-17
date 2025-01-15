import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './types.ts';
import {Offer, AuthData, UserData} from '../types';
import {setOffers, setOffersLoadingStatus} from './action';
// import {saveToken, dropToken} from '../services/token';
// import {APIRoute, AuthorizationStatus} from '../const';
import {APIRoute} from '../const';
import { saveToken, dropToken } from '../services/token';

type AsyncThunkApiType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};


export const fetchOffersAction = createAsyncThunk<Offer[], undefined, AsyncThunkApiType>(
  'data/fetchCards',
  async (_arg, { extra: api }) => {
    // dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    // dispatch(setOffersLoadingStatus(false));
    // dispatch(setOffers(data));
    return data;
  },
);

/*
export const checkAuthAction = createAsyncThunk<void, undefined, AsyncThunkApiType>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get<UserData>(APIRoute.Login);
      dispatch(setUser(response.data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
    dispatch(fetchOffersAction());
  },
);

export const loginAction = createAsyncThunk<void, AuthData, AsyncThunkApiType>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const response = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(response.data.token);
    dispatch(setUser(response.data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(fetchOffersAction());
  }
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkApiType>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(fetchOffersAction());
  },
);

*/
