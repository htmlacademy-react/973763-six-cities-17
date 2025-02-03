import {render, screen} from '@testing-library/react';
import GalleryItem from './gallery-item';
import {BrowserRouter} from 'react-router-dom';

describe('Component: Gallery Item', () => {
  it('should render correctly', () => {
    const expectedTestId = 'gallery-item-container';
    const expectedAltText = 'Photo studio';
    const preparedComponent = <GalleryItem src={'src'}/>;

    render(preparedComponent, {wrapper: BrowserRouter});
    const galleryItemContainer = screen.getByTestId(expectedTestId);

    expect(galleryItemContainer).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
