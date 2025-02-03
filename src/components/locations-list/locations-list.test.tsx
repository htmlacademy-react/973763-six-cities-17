import {render, screen} from '@testing-library/react';
import LocationsList from './locations-list';
import {CITIES_NAMES} from '../../const';

vi.mock('../../components/location-item/location-item', () => {
  const mockLocationItem = () => <div data-testid='location-item-container'>Mock Location Item</div>;
  return {
    default: mockLocationItem
  };
});

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'locations-list-container';
    const locationItemContainerTestId = 'location-item-container';

    render(<LocationsList cities={CITIES_NAMES} IsFavorites={false} />);

    const locationsListContainer = screen.getByTestId(expectedTestId);
    const locationItems = screen.getAllByTestId(locationItemContainerTestId);

    expect(locationsListContainer).toBeInTheDocument();
    expect(locationItems.length).toBe(6);
  });
});
