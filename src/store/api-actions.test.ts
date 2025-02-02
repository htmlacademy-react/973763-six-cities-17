import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeUserData,
  makeFakeOffer,
  makeFakeReview,
  makeFakeOfferDetail
} from '../mocks/mocks';
import { State } from './types';
import {
  checkAuthAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
  fetchReviewsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchFavoritesAction,
  postReviewAction,
  toggleFavoriteAction
} from './api-actions';
import { APIRoute } from '../const';
import {AuthData, ReviewFormData, Offer} from '../types';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFER: { offers: [] }});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123abc' };
      const fakeServerReply = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123abc' };
      const fakeServerReply = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async() => {
      const mockReviews = [makeFakeReview()];
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.fulfilled", when server response 200', async() => {
      const mockNearBy = [makeFakeOffer()];
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`).reply(200, mockNearBy);

      await store.dispatch(fetchNearbyOffersAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);

      expect(fetchNearbyOffersActionFulfilled.payload)
        .toEqual(mockNearBy);
    });

    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`).reply(400, []);

      await store.dispatch(fetchNearbyOffersAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async() => {
      const mockOffer = [makeFakeOfferDetail()];
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(400, []);

      await store.dispatch(fetchOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchFavoritesActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 200', async() => {
      const offerId = 'some-id';
      const fakeReview: ReviewFormData = {
        id: offerId,
        comment: 'some comment',
        rating: 2,
      };
      const fakeServerReply = makeFakeReview();

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, fakeServerReply);

      await store.dispatch(postReviewAction(fakeReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);

      expect(postReviewActionFulfilled.payload)
        .toEqual(fakeServerReply);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      const fakeReview: ReviewFormData = {
        id: offerId,
        comment: 'some comment',
        rating: 2,
      };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(400, []);

      await store.dispatch(postReviewAction(fakeReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      const mockOldFavoriteStatus = true;
      const mockNewFavoriteStatus = Number(!mockOldFavoriteStatus);

      const mockOffer: Offer = {
        ...makeFakeOffer(),
        id: offerId,
        isFavorite: mockOldFavoriteStatus
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${offerId}/${mockNewFavoriteStatus}`).reply(400, []);

      await store.dispatch(toggleFavoriteAction({offerId: mockOffer.id, isFavorite: mockOffer.isFavorite}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.rejected.type,
      ]);
    });
  });
});
