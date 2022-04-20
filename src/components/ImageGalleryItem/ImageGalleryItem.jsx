import s from "./ImageGalleryItem.module.scss";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

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
          alt={el.id}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
