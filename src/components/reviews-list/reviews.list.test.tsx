import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import {makeFakeReview} from '../../mocks/mocks';

vi.mock('../../components/reviews-item/reviews-item', () => {
  const mockReviewsItem = () => <div data-testid='reviews-item-container'>Mock ReviewsItem</div>;
  return {
    default: mockReviewsItem
  };
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'reviews-list-container';
    const reviewsItemContainerTestId = 'reviews-item-container';

    render(<ReviewsList reviews ={[makeFakeReview()]} />);

    const reviewsListContainer = screen.getByTestId(expectedTestId);
    const reviewsItems = screen.getAllByTestId(reviewsItemContainerTestId);

    expect(reviewsListContainer).toBeInTheDocument();
    expect(reviewsItems.length).toBe(1);
  });
});
