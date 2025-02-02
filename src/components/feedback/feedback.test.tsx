import {render, screen} from '@testing-library/react';
import { withStore } from '../../mocks/mock-component';
import Feedback from './feedback';
import { makeFakeReview, makeFakeStore } from '../../mocks/mocks';
import {APIRoute, AuthorizationStatus, LoadingStatus} from '../../const';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Component: FeedbackForm', () => {
  it('should render correctly', () => {
    const expectedTestId = 'feedback-container';
    const expectedLabelText = 'Your review';
    const expectedButtonText = 'Submit';
    const { withStoreComponent } = withStore(<Feedback />, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        userData: null,
        favoriteOffers: [],
        favoritesLoadingStatus: LoadingStatus.NotLoaded,
        favoritesToggleStatus: LoadingStatus.NotLoaded,
      }
    }));

    render(withStoreComponent);

    const feedbackContainer = screen.getByTestId(expectedTestId);
    expect(feedbackContainer).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveTextContent(expectedButtonText);
    expect(screen.getByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should submit button enable when rating and check request is correct', async () => {
    const offerId = 'some-offer-id';
    const expectedReviewValue = 'some-review-text some-review-text some-review-text some-review-text';
    const fakeServerReply = makeFakeReview();
    const reviewElementTestId = 'reviewElement';
    const { withStoreComponent, mockAxiosAdapter } = withStore(<Feedback />, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: null,
        favoriteOffers: [],
        favoritesLoadingStatus: LoadingStatus.NotLoaded,
        favoritesToggleStatus: LoadingStatus.NotLoaded,
      }
    }));
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, fakeServerReply);

    render(
      <MemoryRouter initialEntries={[`/offer/${offerId}`]}>
        <Routes>
          <Route path="/offer/:id" element={withStoreComponent} />
        </Routes>
      </MemoryRouter>
    );
    await userEvent.type(screen.getByTestId(reviewElementTestId), expectedReviewValue);

    const rating5Stars = screen.getByTestId('5-stars');
    const rating4Stars = screen.getByTestId('4-stars');

    await userEvent.click(rating5Stars);

    expect(rating5Stars).toBeChecked();
    expect(rating4Stars).not.toBeChecked();

    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();

    const submitButton = screen.getByRole('button');
    expect(screen.getByRole('button')).not.toBeDisabled();

    await userEvent.click(submitButton);
    expect(screen.getByTestId(reviewElementTestId)).toHaveValue('');

    expect(mockAxiosAdapter.history.post.length).toBe(1);
    const request = mockAxiosAdapter.history.post[0];

    expect(request.url).toBe(`${APIRoute.Comments}/${offerId}`);

    const requestData = JSON.parse(request.data as string) as { comment: string; rating: number };
    expect(requestData.comment).toBe(expectedReviewValue);
    expect(requestData.rating).toBe(5);
  });
});
