import { render } from '@testing-library/react';
import Mao from './map';
import {BrowserRouter} from 'react-router-dom';
import {makeFakeOffer} from '../../mocks/mocks';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const preparedComponent = <Mao type={''} offers={[makeFakeOffer()]} />;

    const { container } = render(preparedComponent, {wrapper: BrowserRouter});

    expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
  });


});
