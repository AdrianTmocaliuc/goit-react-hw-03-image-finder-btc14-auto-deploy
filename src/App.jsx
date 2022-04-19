import { Component } from "react";
import PicApiPixabay from "Services/SearchImagesAPI";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import { Notify } from "notiflix/build/notiflix-notify-aio";
// import Notify from "simple-notify";

const pictures = new PicApiPixabay();

const keyStatus = {
  loading: "loading",
  update: "update",
  error: "error",
  bad: "bad",
  results: "results",
};

class App extends Component {
  state = {
    images: [],
    loadMore: false,
    inputText: "",
    status: keyStatus.update,
    totalImages: 0,
  };

  async componentDidMount() {
    this.setState({ status: keyStatus.loading });
    const { total, totalHits, hits } = await pictures.getPics();

    this.setState({
      images: hits,
      loadMore: true,
      status: hits ? keyStatus.update : keyStatus.bad,
      totalImages: totalHits,
    });
    Notify.success(`We've got ${total} results `);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { inputText, totalImages } = this.state;
    const checkState = prevState.inputText !== this.state.inputText;

    if (checkState) {
      this.setState({ status: keyStatus.loading });
      pictures.searchQuery = this.state.inputText;
      const { totalHits, hits } = await pictures.getPics();

      this.setState({
        images: hits,
        loadMore: totalHits <= 12 ? false : true,
        status: !!hits.length ? keyStatus.update : keyStatus.bad,
        totalImages: totalHits,
      });

      if (!!hits.length) {
        Notify.success(`We've got ${totalHits} results `);
      }
    }
  }

  onSubmitForm = (inputText) => {
    this.setState({ images: [], status: keyStatus.update, inputText });
  };

  onClickLoadMore = async () => {
    this.setState({ loadMore: false });
    pictures.incrementPage();
    const { totalHits, hits } = await pictures.getPics();
    const totalImages = this.state.images.length + 12;

    this.setState({
      images: [...this.state.images, ...hits],
      loadMore: totalImages >= totalHits ? false : true,
    });
  };

  render() {
    const { images, loadMore, status, inputText, totalImages } = this.state;
    const { onClickLoadMore, onSubmitForm } = this;

    return (
      <div className="App">
        <Searchbar onSubmit={onSubmitForm} />
        {status === keyStatus.update && (
          <ImageGallery
            images={images}
            loadMore={loadMore}
            onClickLoadMore={onClickLoadMore}
            totalImages={totalImages}
          />
        )}
        {status === keyStatus.loading && <Loader />}
        {status === keyStatus.bad && (
          <h2 style={{ margin: "0 auto" }}>
            On "{inputText}" nothing found &#x2639;
          </h2>
        )}
      </div>
    );
  }
}

export default App;
