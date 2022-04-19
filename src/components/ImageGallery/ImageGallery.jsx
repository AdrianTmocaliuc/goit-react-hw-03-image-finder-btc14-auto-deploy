import { Component } from "react";
import s from "./ImageGallery.module.scss";
import ImageGalleryItem from "./../ImageGalleryItem/ImageGalleryItem";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import { Rings } from "react-loader-spinner";

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
  // toggleLoader = () => {
  //   this.setState({ loader: !this.state.loadMore });
  // };

  render() {
    const { largeImage, modalShow } = this.state;
    const { images, loadMore, onClickLoadMore } = this.props;
    const { onClickImage, toggleModal } = this;

    return (
      <>
        <ul className={s.imageGallery}>
          <ImageGalleryItem images={images} onClick={onClickImage} />
        </ul>
        {loadMore ? (
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
