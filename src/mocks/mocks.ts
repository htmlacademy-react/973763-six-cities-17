import { ThunkDispatch } from 'redux-thunk';
import {State} from '../store/types';
import {createAPI} from '../services/api';
import { Action } from 'redux';
import {UserData, Offer, OfferDetail, Review, CityLocation, Location} from '../types';
import {AuthorizationStatus, DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION, LoadingStatus} from '../const';
import { lorem, datatype, image, helpers, internet, name } from 'faker';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  APP: {
    activeCityName: DEFAULT_CITY_NAME,
    offerSortOption: DEFAULT_SORT_OPTION,
  },
  OFFER: {
    offers: [],
    offersLoadingStatus: LoadingStatus.NotLoaded,
    offer: null,
    offerLoadingStatus: LoadingStatus.NotLoaded,
    nearbyOffers: [],
    nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
  },
  REVIEW: {
    reviews: [],
    reviewsLoadingStatus: LoadingStatus.NotLoaded
  },
  USER: {
    authorizationStatus: AuthorizationStatus.UNKNOWN,
    userData: null,
    favoriteOffers: [],
    favoritesLoadingStatus: LoadingStatus.NotLoaded,
    favoritesToggleStatus: LoadingStatus.NotLoaded,
  },
  ...initialState ?? {},
});

export const makeFakeLocation = (): Location => ({
  latitude: 52.35514938496378,
  longitude: 4.673877537499948,
  zoom: 8
});

export const makeFakeCityLocation = (): CityLocation => ({
  name: lorem.word(),
  location: makeFakeLocation()
});

export const makeFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: 'user_token'
});

const makeFakeImagesData = (): string[] => Array<string>(8).fill(image.imageUrl());

export const makeFakeOfferDetail = (): OfferDetail => ({
  id: lorem.word(),
  title: lorem.word(3),
  type: helpers.randomize(['room', 'apartment']),
  price: datatype.number(999),
  previewImage: image.imageUrl(),
  city: makeFakeCityLocation(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(5),
  description: lorem.sentence(12),
  bedrooms: datatype.number(4),
  goods: helpers.shuffle(['Heating', 'Towels', 'Washing machine']),
  host: makeFakeUserData(),
  images: makeFakeImagesData(),
  maxAdults: datatype.number(5)
});

export const makeFakeOffer = (): Offer => ({
  id: lorem.word(),
  title: lorem.word(3),
  type: helpers.randomize(['room', 'apartment']),
  price: datatype.number(999),
  city: makeFakeCityLocation(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(5),
  previewImage: image.imageUrl()
});

export const makeFakeReview = (): Review => ({
  id: Date.now().toString(),
  comment: lorem.lines(1),
  date: new Date().toISOString(),
  rating: datatype.number(5),
  user: makeFakeUserData()
});
