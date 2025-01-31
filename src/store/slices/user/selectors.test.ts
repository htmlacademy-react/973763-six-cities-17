import {AuthorizationStatus, LoadingStatus, NameSpace} from '../../../const';
import { getAuthorizationStatus, getUserData, getFavoriteOffers, getFavoritesLoadingStatus, getFavoriteStatusByOfferId, getIsAuthed, getFavoritesCities } from './selectors';
import {makeFakeLocation, makeFakeOffer, makeFakeUserData} from '../../../mocks/mocks';

describe('User selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: makeFakeUserData(),
      favoriteOffers: [{
        ...makeFakeOffer(),
        id: '7a',
        city: {
          name: 'Paris',
          location: makeFakeLocation()
        }
      },
      {
        ...makeFakeOffer(),
        id: '98',
        city: {
          name: 'Amsterdam',
          location: makeFakeLocation()
        }
      },
      {
        ...makeFakeOffer(),
        id: '99',
        city: {
          name: 'Amsterdam',
          location: makeFakeLocation()
        }
      }
      ],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    }
  };

  it('should return authorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.User] ;
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return userData from state', () => {
    const { userData } = state[NameSpace.User] ;
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });

  it('should return favoriteOffers from state', () => {
    const { favoriteOffers } = state[NameSpace.User] ;
    const result = getFavoriteOffers(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('should return favoritesLoadingStatus from state', () => {
    const { favoritesLoadingStatus } = state[NameSpace.User] ;
    const result = getFavoritesLoadingStatus(state);
    expect(result).toBe(favoritesLoadingStatus);
  });

  it('should check if an offer is in favorites by id from state', () => {
    const result = getFavoriteStatusByOfferId(state, '7a');
    const result2 = getFavoriteStatusByOfferId(state, '999');
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });

  it('should determine if the user is authenticated', () => {
    const result = getIsAuthed(state);
    expect(result).toBe(false);
  });

  it('should return unique cities from favorite offers from state', () => {
    const result = getFavoritesCities(state);
    expect(result).toEqual(['Paris', 'Amsterdam']);
  });
});
