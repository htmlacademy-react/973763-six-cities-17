import {AuthorizationStatus, LoadingStatus, NameSpace} from '../../../const';
import { getOffers,
  getOffersLoadingStatus,
  getOffer,
  getOfferLoadingStatus,
  getNearbyOffers,
  getNearbyOffersLoadingStatus,
  getIsAppLoading,
  getIsOfferPageLoading,
  getSortedOffers, } from './selectors';
import {makeFakeLocation, makeFakeOffer} from '../../../mocks/mocks';
import { Offer, SortType, CityName } from '../../../types';

describe('Offer selectors', () => {
  const mockOffers: Offer[] = [{
    ...makeFakeOffer(),
    id: '1',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    price: 100,
    rating: 4.5,
  },
  {
    ...makeFakeOffer(),
    id: '2',
    city: {
      name: 'Amsterdam',
      location: makeFakeLocation()
    },
    price: 200,
    rating: 3.5,
  },
  {
    ...makeFakeOffer(),
    id: '3',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    price: 150,
    rating: 5.0,
  }
  ];

  const state = {
    [NameSpace.Offer]: {
      offers: mockOffers,
      offersLoadingStatus: LoadingStatus.Loaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [mockOffers[1]],
      nearbyOffersLoadingStatus: LoadingStatus.Loaded,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    },
    [NameSpace.Review]: {
      reviews: [],
      reviewsLoadingStatus: LoadingStatus.NotLoaded
    },
    [NameSpace.App]: {
      activeCityName: 'Paris' as CityName,
      offerSortOption: { name: 'PriceToHigh' } as SortType,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offer] ;
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return offers loading status', () => {
    const { offersLoadingStatus } = state[NameSpace.Offer] ;
    const result = getOffersLoadingStatus(state);
    expect(result).toBe(offersLoadingStatus);
  });

  it('should return offer from state', () => {
    const { offer } = state[NameSpace.Offer] ;
    const result = getOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return offer loading status', () => {
    const { offerLoadingStatus } = state[NameSpace.Offer] ;
    const result = getOfferLoadingStatus(state);
    expect(result).toBe(offerLoadingStatus);
  });

  it('should return nearby offers from state', () => {
    const { nearbyOffers } = state[NameSpace.Offer] ;
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return nearby offers loading status', () => {
    const { nearbyOffersLoadingStatus } = state[NameSpace.Offer] ;
    const result = getNearbyOffersLoadingStatus(state);
    expect(result).toBe(nearbyOffersLoadingStatus);
  });

  it('should determine if the app is loading', () => {
    const result = getIsAppLoading(state);
    expect(result).toBe(false);
  });

  it('should determine if the offer page is loading', () => {
    const result = getIsOfferPageLoading(state);
    expect(result).toBe(false);
  });

  it('should return sorted offers by city and sort option', () => {
    const result = getSortedOffers(state);
    expect(result.length).toBe(2);
    expect(result[0].price).toBe(100);
    expect(result[1].price).toBe(150);
  });
});
