import {makeFakeOffer, makeFakeOfferDetail} from '../../../mocks/mocks';
import {fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction} from '../../api-actions';
import {offerSlice} from './offer';
import {LoadingStatus} from '../../../const';
import {OfferState} from '../../types';
import {Offer} from '../../../types.ts';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "offersLoadingStatus" to "LoadingStatus.Loading" with "fetchOffersAction.pending"', () => {
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.Loading,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, fetchOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offers" and "offersLoadingStatus" to "LoadingStatus.Loaded" with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = Array<Offer>(10).fill(makeFakeOffer());
    const expectedState: OfferState = {
      offers: mockOffers,
      offersLoadingStatus: LoadingStatus.Loaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, fetchOffersAction.fulfilled(mockOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to empty array and "offersLoadingStatus" to "LoadingStatus.Failed" with "fetchOffersAction.rejected"', () => {
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.Failed,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, fetchOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "offerLoadingStatus" to "LoadingStatus.Loading" with "fetchOfferAction.pending"', () => {
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.Loading,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, fetchOfferAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offer" and "offerLoadingStatus" to "LoadingStatus.Loaded" with "fetchOfferAction.fulfilled"', () => {
    const mockOffer = makeFakeOfferDetail();
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: mockOffer,
      offerLoadingStatus: LoadingStatus.Loaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, fetchOfferAction.fulfilled(mockOffer, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to empty array and "offerLoadingStatus" to "LoadingStatus.Failed" with "fetchOfferAction.rejected"', () => {
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.Failed,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.NotLoaded,
    };
    const result = offerSlice.reducer(undefined, fetchOfferAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffersLoadingStatus" to "LoadingStatus.Loading" with "fetchNearbyOffersAction.pending"', () => {
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.Loading,
    };
    const result = offerSlice.reducer(undefined, fetchNearbyOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" and "nearbyOffersLoadingStatus" to "LoadingStatus.Loaded" with "fetchNearbyOffersAction.fulfilled"', () => {
    const mockNearbyOffers = Array<Offer>(3).fill(makeFakeOffer());
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: mockNearbyOffers,
      nearbyOffersLoadingStatus: LoadingStatus.Loaded,
    };
    const result = offerSlice.reducer(undefined, fetchNearbyOffersAction.fulfilled(mockNearbyOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to empty array and "nearbyOffersLoadingStatus" to "LoadingStatus.Failed" with "fetchNearbyOffersAction.rejected"', () => {
    const expectedState: OfferState = {
      offers: [],
      offersLoadingStatus: LoadingStatus.NotLoaded,
      offer: null,
      offerLoadingStatus: LoadingStatus.NotLoaded,
      nearbyOffers: [],
      nearbyOffersLoadingStatus: LoadingStatus.Failed,
    };
    const result = offerSlice.reducer(undefined, fetchNearbyOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
