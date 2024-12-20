import {CityName, Offer} from './types';

export const getOffersByCity = (offers: Offer[], filterType: CityName) => offers.filter((offer) => offer.city.name === filterType);

export const getFavoritesCities = (offers: Offer[]) => [...new Set(offers.map((offer) => offer.city.name))];
