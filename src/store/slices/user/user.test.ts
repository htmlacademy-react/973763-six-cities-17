import {makeFakeOffer, makeFakeUserData} from '../../../mocks/mocks';
import {checkAuthAction, fetchFavoritesAction,loginAction, logoutAction, toggleFavoriteAction} from '../../api-actions';
import {userSlice} from './user';
import {AuthorizationStatus, LoadingStatus} from '../../../const';
import {UserState} from '../../types';
import {Offer} from '../../../types.ts';

describe('User Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "UNKNOWN" with "checkAuthAction.pending" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.UNKNOWN };
    const result = userSlice.reducer(undefined, checkAuthAction.pending);
    expect(result.authorizationStatus).toBe(expectedState.authorizationStatus);
  });


  it('should set "AUTH" and UserData with "checkAuthAction.fulfilled" action', () => {
    const fakeUserData = makeFakeUserData();
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: fakeUserData,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.fulfilled(fakeUserData, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "NO_AUTH" with "checkAuthAction.rejected" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.NO_AUTH };
    const result = userSlice.reducer(undefined, checkAuthAction.rejected);
    expect(result.authorizationStatus).toBe(expectedState.authorizationStatus);
  });

  it('should set "UNKNOWN" with "loginAction.pending" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.UNKNOWN };
    const result = userSlice.reducer(undefined, loginAction.pending);
    expect(result.authorizationStatus).toBe(expectedState.authorizationStatus);
  });


  it('should set "AUTH" and UserData with "loginAction.fulfilled" action', () => {
    const fakeUserData = makeFakeUserData();
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: fakeUserData,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(fakeUserData, '', {email: '', password: ''}));
    expect(result).toEqual(expectedState);
  });

  it('should set "NO_AUTH" with "loginAction.rejected" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.NO_AUTH };
    const result = userSlice.reducer(undefined, loginAction.rejected);
    expect(result.authorizationStatus).toBe(expectedState.authorizationStatus);
  });

  it('should set "NO_AUTH" with "logoutAction.fulfilled" action', () => {
    const fakeUserData = makeFakeUserData();
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: fakeUserData,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.Loaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });


  it('should set "favoritesLoadingStatus" to "LoadingStatus.Loading" with "fetchFavoritesAction.pending"', () => {
    const expectedState = {
      favoritesLoadingStatus: LoadingStatus.Loading,
    };

    const result = userSlice.reducer(undefined, fetchFavoritesAction.pending);
    expect(result.favoritesLoadingStatus).toBe(expectedState.favoritesLoadingStatus);
  });

  it('should set "favoriteOffers" and "favoritesLoadingStatus" to "LoadingStatus.Loaded" with "fetchFavoritesAction.fulfilled"', () => {
    const mockFavoriteOffers = Array<Offer>(10).fill(makeFakeOffer());
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: mockFavoriteOffers,
      favoritesLoadingStatus: LoadingStatus.Loaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(undefined, fetchFavoritesAction.fulfilled(mockFavoriteOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffers" to empty array and "favoritesLoadingStatus" to "LoadingStatus.Failed" with "fetchFavoritesAction.rejected"', () => {
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.Failed,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    };

    const result = userSlice.reducer(undefined, fetchFavoritesAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "favoritesToggleStatus" to "LoadingStatus.Loading" with "toggleFavoriteAction.pending"', () => {
    const expectedState = {
      favoritesToggleStatus: LoadingStatus.Loading,
    };

    const result = userSlice.reducer(undefined, toggleFavoriteAction.pending);
    expect(result.favoritesToggleStatus).toBe(expectedState.favoritesToggleStatus);
  });

  it('should toggle isFavorite property of offer in "favoriteOffers" and "favoritesToggleStatus" to "LoadingStatus.Loaded" with "toggleFavoriteAction.fulfilled"', () => {
    const mockFavoriteOffers = [
      {...makeFakeOffer(), id: '1', isFavorite: true },
      {...makeFakeOffer(), id: '2', isFavorite: true },
    ];
    const mockUpdatedOffer = {...mockFavoriteOffers[0], isFavorite: false };

    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: mockFavoriteOffers,
      favoritesLoadingStatus: LoadingStatus.Loaded,
      favoritesToggleStatus: LoadingStatus.Loaded,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
      favoriteOffers: [mockFavoriteOffers[1]],
      favoritesLoadingStatus: LoadingStatus.Loaded,
      favoritesToggleStatus: LoadingStatus.Loaded,
    };

    const result = userSlice.reducer(initialState, toggleFavoriteAction.fulfilled(mockUpdatedOffer, '', {offerId: '1', isFavorite: true}));
    expect(result).toEqual(expectedState);
  });

  it('should set "favoritesToggleStatus" to "LoadingStatus.Failed" with "toggleFavoriteAction.rejected"', () => {
    const expectedState = {
      favoritesToggleStatus: LoadingStatus.Failed,
    };

    const result = userSlice.reducer(undefined, toggleFavoriteAction.rejected);
    expect(result.favoritesToggleStatus).toBe(expectedState.favoritesToggleStatus);
  });
});
