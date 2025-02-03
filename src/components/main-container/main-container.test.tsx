import {render, screen} from '@testing-library/react';
import MainContainer from './main-container';
import {CITIES_NAMES} from '../../const';
import {makeFakeOffer, makeFakeStore} from '../../mocks/mocks';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '../../mocks/mock-component';
describe('Component: Main Container', () => {
  it('should render correctly', () => {
    const expectedTestId = 'main-container';
    const { withStoreComponent } = withStore(<MainContainer activeCityName={CITIES_NAMES[0]} offers={[makeFakeOffer()]} />, makeFakeStore({}));

    render(withStoreComponent, {wrapper: BrowserRouter});

    const mainContainer = screen.getByTestId(expectedTestId);

    expect(mainContainer).toBeInTheDocument();

  });
});
