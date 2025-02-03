import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './types.ts';
import {Offer, AuthData, UserData, OfferDetail, Review, ReviewFormData} from '../types';
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

export const toggleFavoriteAction = createAsyncThunk<Offer, {offerId: string; isFavorite: boolean}, AsyncThunkApiType>(
  'data/toggleFavoriteAction',
  async ({ offerId, isFavorite }, {getState, extra: api }) => {
    const newFavoriteStatus = Number(!isFavorite);
    const { data } = await api.post<OfferDetail>(`${APIRoute.Favorite}/${offerId}/${newFavoriteStatus}`);
    const {offers} = getState().OFFER;
    const currentOffer = offers.find((offer) => offer.id === data.id);

    if (!currentOffer) {
      throw new Error(`Failed to find offer with such id : ${data.id}`);
    }

    return {...currentOffer, isFavorite: data.isFavorite};
  },
);

export const fetchOfferAction = createAsyncThunk<OfferDetail, string | undefined, AsyncThunkApiType>(
  'data/fetchOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferDetail>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string | undefined, AsyncThunkApiType>(
  'data/fetchNearby',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string | undefined, AsyncThunkApiType>(
  'data/fetchReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<Review, ReviewFormData, AsyncThunkApiType>(
  'data/postReview',
  async ({ id, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${id}`, { comment, rating });
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
