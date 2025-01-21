import {CityName, Offer, SortType} from './types';

export const getOffersByCity = (offers: Offer[], filterType: CityName) => offers.filter((offer) => offer.city.name === filterType);

export const getFavoritesCities = (offers: Offer[]) => [...new Set(offers.map((offer) => offer.city.name))];

export const getOffersBySortOption = (offers: Offer[], sortOption: SortType) => {
  switch (sortOption.name) {
    case 'Popular':
      return offers;
    case 'PriceToHigh':
      return offers.toSorted((a, b) => a.price - b.price);
    case 'PriceToLow':
      return offers.toSorted((a, b) => b.price - a.price);
    case 'TopRated':
      return offers.toSorted((a, b) => b.rating - a.rating);

    default: return offers;
  }
};

export const regexForPassword = new RegExp(/(?=.*[0-9])(?=.*[a-z])/);
export const regexForEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export const getRandomArrayElement = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const formatRating = (rating: number) => String(Math.round(rating) * 20);

export const formatDateToString = (date: Date) => `${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;
