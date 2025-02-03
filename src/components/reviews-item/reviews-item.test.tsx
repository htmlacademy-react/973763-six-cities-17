import {render, screen} from '@testing-library/react';
import ReviewsItem from './reviews-item';
import {BrowserRouter} from 'react-router-dom';
import {makeFakeReview} from '../../mocks/mocks';

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const expectedTestId = 'reviews-item-container';
    const expectedAltText = 'Reviews avatar';
    const preparedComponent = <ReviewsItem review={mockReview}/>;

    render(preparedComponent, {wrapper: BrowserRouter});
    const reviewsItemContainer = screen.getByTestId(expectedTestId);

    expect(reviewsItemContainer).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(`${mockReview.comment}`)).toBeInTheDocument();
  });
});
