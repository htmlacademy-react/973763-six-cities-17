import { SortType } from './types';

const CITIES_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

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

export {CITIES_NAMES, SortOptions};
