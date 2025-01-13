import SavedNewsCardList from "../SavedCardList/SavedCardList";
import "./SavedNewsHeader.css";
const SavedNewsHeader = ({ savedArticles }) => {
  return (
    <div className="saved-news-header">
      <header className="saved-news-header-container">
        <h1 className="saved-news-header-title">Saved articles</h1>
        <p className="saved-news-header-subtitle">
          Ray, you have 5 saved <br />
          articles
        </p>
        <p className="saved-news-header-keywords">By keywords:</p>
      </header>

      <SavedNewsCardList savedArticles={savedArticles} />
    </div>
  );
};
export default SavedNewsHeader;
