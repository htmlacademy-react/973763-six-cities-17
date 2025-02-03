import {render, screen} from '@testing-library/react';
import {makeFakeStore} from '../../mocks/mocks';
import LocationItem from './location-item';
import userEvent from '@testing-library/user-event';
import { CITIES_NAMES, DEFAULT_SORT_OPTION} from '../../const';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '../../mocks/mock-component';
import { useAppDispatch } from '../../store/use-app-dispatch';
import { setActiveCityName } from '../../store/slices/app/app';

vi.mock('../../store/use-app-dispatch', () => ({
  useAppDispatch: vi.fn(),
}));

describe('Component: LocationItem', () => {
  it('should render correctly and call handleLinkClick when Link is clicked', async () => {

    const mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    const mockCityName = CITIES_NAMES[0];
    const expectedTestId = 'location-item-container';
    const { withStoreComponent } = withStore(<LocationItem cityName={mockCityName} isFavorites isActive={false} />, makeFakeStore({
      APP: {
        activeCityName: CITIES_NAMES[0],
        offerSortOption: DEFAULT_SORT_OPTION,
      }
    }));

    render(withStoreComponent , {wrapper: BrowserRouter});

    const locationItemContainer = screen.getByTestId(expectedTestId);
    expect(locationItemContainer).toBeInTheDocument();
    expect(screen.getByText(mockCityName)).toBeInTheDocument();

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();

    await userEvent.click(linkElement);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setActiveCityName(mockCityName));
  });
});
