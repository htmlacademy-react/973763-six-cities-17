import { CITIES_NAMES } from './const';

type CityName = typeof CITIES_NAMES[number];

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type UserData = User & {
  email: string;
  token: string;
};

type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type CityLocation = {
  name: CityName;
  location: Location;
}

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityLocation;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
}

type OfferDetail = Offer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

type SortType = {
  name: string;
  value: string;
};

export type {UserData, Offer, OfferDetail, SortType, Review, CityLocation, CityName};
