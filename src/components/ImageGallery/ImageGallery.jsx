import { Component } from "react";
import s from "./ImageGallery.module.scss";
import ImageGalleryItem from "./../ImageGalleryItem/ImageGalleryItem";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";

class ImageGallery extends Component {
  state = {
    modalShow: false,
    largeImage: "",
  };

  onClickImage = (e) => {
    this.setState({ modalShow: true, largeImage: e.currentTarget.id });
  };

  toggleModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  render() {
    const { largeImage, modalShow } = this.state;
    const { images, loadMore, onClickLoadMore, totalImages } = this.props;
    const { onClickImage, toggleModal } = this;
    console.log(images.length);
    console.log(totalImages);

    return (
      <>
        <ul className={s.imageGallery}>
          <ImageGalleryItem images={images} onClick={onClickImage} />
        </ul>
        {images.length === totalImages ? null : loadMore ? (
          <Button onClick={onClickLoadMore}>Load more...</Button>
        ) : (
          <Loader />
        )}
        {modalShow && <Modal onClose={toggleModal} largeImage={largeImage} />}
      </>
    );
  }
}

export default ImageGallery;
