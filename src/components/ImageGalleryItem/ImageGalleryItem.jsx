import s from "./ImageGalleryItem.module.scss";

const ImageGalleryItem = ({ images, onClick }) => {
  // console.log(images);
  return images.map((image) => {
    return (
      <li
        key={image.id}
        id={image.largeImageURL}
        className={s.ImageGalleryItem}
        onClick={onClick}
      >
        <img
          className={s.ImageGalleryItem_image}
          src={image.webformatURL}
          alt="Image"
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
