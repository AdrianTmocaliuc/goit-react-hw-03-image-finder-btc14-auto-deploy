import { Component } from "react";
import PicApiPixabay from "Services/SearchImagesAPI";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";

const pictures = new PicApiPixabay();

const keyStatus = {
  loading: "loading",
  update: "update",
  error: "error",
  results: "results",
};

class App extends Component {
  state = {
    images: [],
    loadMore: false,
    inputText: "",
    status: keyStatus.update,
  };

  async componentDidMount() {
    this.setState({ status: keyStatus.loading });
    const { totalHits, hits } = await pictures.getPics();

    if (!hits) {
      this.setState({ status: keyStatus.error });
      return;
    }
    this.setState({
      images: hits,
      loadMore: true,
      status: keyStatus.update,

      // loadMore: totalHits <= 3 ? false : true,
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    const checkState = prevState.inputText !== this.state.inputText;

    if (checkState) {
      this.setState({ status: keyStatus.loading });
      pictures.searchQuery = this.state.inputText;
      const { totalHits, hits } = await pictures.getPics();

      this.setState({
        images: hits,
        loadMore: true,
        // loadMore: totalHits <= 25 ? false : true,
        status: keyStatus.update,
      });
      return;
    }
    if (this.state.images === []) {
      this.setState({ status: keyStatus.error });
      return;
    }
  }

  onSubmitForm = (inputText) => {
    this.setState({ images: [], status: keyStatus.update, inputText });
  };

  onClickLoadMore = async () => {
    this.setState({ loadMore: false });
    pictures.incrementPage();
    const { hits } = await pictures.getPics();

    this.setState({ images: [...this.state.images, ...hits], loadMore: true });
  };

  render() {
    const { images, loadMore, status } = this.state;
    const { onClickLoadMore, onSubmitForm } = this;
    // console.log(results);

    return (
      <div className="App">
        <Searchbar onSubmit={onSubmitForm} />
        {status === keyStatus.update && (
          <ImageGallery
            images={images}
            loadMore={loadMore}
            onClickLoadMore={onClickLoadMore}
          />
        )}
        {status === keyStatus.loading && <Loader />}
        {status === keyStatus.error && <h3>Nothing Found...</h3>}
      </div>
    );
  }
}

export default App;
