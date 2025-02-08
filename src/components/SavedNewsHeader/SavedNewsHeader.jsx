import SavedCardList from "../SavedCardList/SavedCardList";
import "./SavedNewsHeader.css";

const SavedNewsHeader = ({ savedArticles }) => {
  console.log("savedArticles", savedArticles);
  return (
    <div className="saved-news-header">
      <header className="saved-news-header-container">
        <h1 className="saved-news-header__title">Saved articles</h1>
        <p className="saved-news-header__subtitle">
          Ted, you have 5 saved <br />
          articles
        </p>
        <p className="saved-news-header__keywords">By keywords:</p>
      </header>
      <SavedCardList savedArticles={savedArticles} />
    </div>
  );
};
export default SavedNewsHeader;
