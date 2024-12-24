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
