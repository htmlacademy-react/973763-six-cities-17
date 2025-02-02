import {render, screen} from '@testing-library/react';
import Gallery from './gallery';

vi.mock('../../components/gallery-item/gallery-item', () => {
  const mockGalleryItem = () => <div data-testid='gallery-item-container'>Mock Gallery Item</div>;
  return {
    default: mockGalleryItem
  };
});

describe('Component: Gallery', () => {
  it('should render correctly', () => {
    const expectedTestId = 'gallery-container';
    const galleryItemContainerTestId = 'gallery-item-container';

    render(<Gallery images={['src1', 'src2']} />);

    const galleryContainer = screen.getByTestId(expectedTestId);
    const galleryItems = screen.getAllByTestId(galleryItemContainerTestId);

    expect(galleryContainer).toBeInTheDocument();
    expect(galleryItems.length).toBe(2);
  });
});
