type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type UserData = User & {
  email: string;
  token: string;
};

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type CityLocation = {
  name: string;
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

export type {UserData, Offer, OfferDetail};
