import "./NewsCard.css";

const NewsCard = ({
  article,
  onCardLike,
  onCardDelete,
  isLoggedIn,
  savedArticles = [],
}) => {
  // Check if the article is already saved
  const isSaved = savedArticles.some(
    (savedArticle) => savedArticle.url === article?.url
  );

  // Handle bookmark button click
  const handleBookmarkClick = () => {
    if (isSaved) {
      onCardDelete(article); // Call onCardDelete if the article is saved
    } else {
      onCardLike(article); // Call onCardLike if the article is not saved
    }
  };    

  return (
    <div className="news-card">
      <img
        src={article?.urlToImage || "default-image.jpg"} // Fallback for missing image
        alt={article?.title || "News Image"}
        className="news-card__image"
      />
      <p className="news-card__date">
        Date:{" "}
        {article?.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : "Unknown Date"}
      </p>
      <div className="news-card__content">
        <h3 className="news-card__title">{article?.title || "Untitled Article"}</h3>
        <p className="news-card__description">
          {article?.description || "No description available."}
        </p>
        {isLoggedIn && ( // Show the bookmark button only if the user is logged in
          <button
            className={`news-card__bookmark ${isSaved ? "saved" : ""}`}
            onClick={handleBookmarkClick}
            aria-label={isSaved ? "Remove from saved articles" : "Save article"}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
