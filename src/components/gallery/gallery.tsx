import GalleryItem from '../gallery-item/gallery-item';

type GalleryProps = {
  images: string[];
}

function Gallery({images}: GalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image) => <GalleryItem src={image} key={image}/>)}
      </div>
    </div>

  );
}

export default Gallery;
