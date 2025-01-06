import {CityName, SortType} from './types';

const CITIES_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const DEFAULT_CITY_NAME: CityName = CITIES_NAMES[3];

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

const DEFAULT_SORT_OPTION: SortType = SortOptions[0];

enum CardType {
  Favorites = 'favorites',
  Cities = 'cities',
  NearPlaces = 'near-places',
}

enum ClassNamePrefix {
  Offer = 'offer',
  PlaceCard = 'place-card',
  Reviews = 'reviews',
  Cities = 'cities'
}

enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

const ReviewTextLength = {
  MIN: 50,
  MAX: 300
} as const;

const UrlMarker = {
  DEFAULT: '/img/pin.svg',
  CURRENT: '/img/pin-active.svg'
} as const;

const IconMarkerSize = {
  WIDTH: 27,
  HEIGHT: 39
} as const;

const IconAnchorSize = {
  WIDTH: IconMarkerSize.WIDTH / 2,
  HEIGHT: IconMarkerSize.HEIGHT
} as const;

const MapInfo = {
  URL_TEMPLATE: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;

enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}

export {SortOptions, CardType, AuthorizationStatus, CITIES_NAMES, DEFAULT_CITY_NAME, ClassNamePrefix, ReviewTextLength, UrlMarker, IconAnchorSize, IconMarkerSize, MapInfo, DEFAULT_SORT_OPTION, APIRoute};
