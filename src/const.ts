import { SortType } from './types';

const SortOptions: SortType[] = [
  {
    name: 'Popular',
    value: 'Popular'
  },
  {
    name: 'PriceToHigh',
    value: 'Price: low to high'
  },
  {
    name: 'PriceToLow',
    value: 'Price: high to low'
  },
  {
    name: 'TopRated',
    value: 'Top rated first'
  }
];

const enum CardType {
  Favorites = 'favorites',
  Cities = 'cities',
  NearPlaces = 'near-places',
}

enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export {SortOptions, CardType, AuthorizationStatus};
