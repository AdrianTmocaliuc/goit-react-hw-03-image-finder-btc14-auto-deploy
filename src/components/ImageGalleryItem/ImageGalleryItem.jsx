import s from "./ImageGalleryItem.module.scss";
import { nanoid } from "nanoid";

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map((image) => {
    // console.log(image.id, image.user_id);
    return (
      <li
        key={nanoid()}
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
