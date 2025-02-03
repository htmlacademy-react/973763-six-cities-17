import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sort from './sort';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '../../mocks/mock-component';
import {makeFakeStore} from '../../mocks/mocks';
import {DEFAULT_CITY_NAME, DEFAULT_SORT_OPTION} from '../../const';
import { useAppDispatch } from '../../store/use-app-dispatch';
import { setOfferSortOption } from '../../store/slices/app/app';
import { getSortOption } from '../../store/slices/app/selectors';
import { SortOptions } from '../../const';

vi.mock('../../store/use-app-dispatch', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/slices/app/selectors', () => ({
  getSortOption: vi.fn(),
}));

vi.mock('../../store/slices/app/app', () => ({
  setOfferSortOption: vi.fn(),
}));

describe('Component: Sort', () => {
  const mockDispatch = vi.fn();
  const { withStoreComponent } = withStore(<Sort />, makeFakeStore({
    APP: {
      activeCityName: DEFAULT_CITY_NAME,
      offerSortOption: DEFAULT_SORT_OPTION,
    }
  }));

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    vi.mocked(getSortOption).mockReturnValue(SortOptions[0]);
    const expectedTestId = 'sort-container';
    const expectedClassName = 'places__sorting';

    render(withStoreComponent, {wrapper: BrowserRouter});
    const sortContainer = screen.getByTestId(expectedTestId);

    expect(sortContainer).toBeInTheDocument();
    expect(sortContainer).toHaveClass(expectedClassName);
  });

  it('should open and close the sort options block', async () => {
    vi.mocked(getSortOption).mockReturnValue(SortOptions[0]);
    render(withStoreComponent, {wrapper: BrowserRouter});

    const sortOptionsBlock = screen.getByTestId('sort-options-block');
    expect(sortOptionsBlock).not.toHaveClass('places__options--opened');

    const sortTypeElement = screen.getByTestId('sort-type-element');
    await userEvent.click(sortTypeElement);
    expect(sortOptionsBlock).toHaveClass('places__options--opened');

    await userEvent.click(sortTypeElement);
    expect(sortOptionsBlock).not.toHaveClass('places__options--opened');
  });

  it('should change the sort option when a new option is clicked', async () => {
    vi.mocked(getSortOption).mockReturnValue(SortOptions[0]);
    render(withStoreComponent, {wrapper: BrowserRouter});

    const sortTypeElement = screen.getByTestId('sort-type-element');
    await userEvent.click(sortTypeElement);

    const newSortOption = SortOptions[1];
    const newSortOptionElement = screen.getByText(newSortOption.value);
    await userEvent.click(newSortOptionElement);
    expect(mockDispatch).toHaveBeenCalledWith(setOfferSortOption(newSortOption));

    const sortOptionsBlock = screen.getByTestId('sort-options-block');
    expect(sortOptionsBlock).not.toHaveClass('places__options--opened');
  });
});
