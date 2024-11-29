type GalleryItemProps = {
  src: string;
}

function GalleryItem({src}: GalleryItemProps): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img
        className="offer__image"
        src={`${src}`}
        alt="Photo studio"
      />
    </div>
  );
}

export default GalleryItem;
