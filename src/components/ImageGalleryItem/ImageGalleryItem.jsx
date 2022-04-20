import s from "./ImageGalleryItem.module.scss";
import { nanoid } from "nanoid";

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map((el) => {
    // console.log(el.id, el.user_id);
    return (
      <li
        key={nanoid()}
        id={el.largeImageURL}
        className={s.ImageGalleryItem}
        onClick={onClick}
      >
        <img
          className={s.ImageGalleryItem_image}
          src={el.webformatURL}
          alt="Image"
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
