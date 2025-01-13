import "./SavedCardList.css";
import SavedNews from "../SavedNews/SavedNews";
import { useState } from "react";
const SavedNewsCardList = ({ savedArticles }) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const handleShowMore = () => {
    setVisibleCount((count) => {
      return count + 3;
    });
  };

  return (
    <section className="saved-news-list">
      {savedArticles.slice(0, visibleCount).map((article, index) => (
        <SavedNews key={index} article={article} />
      ))}
    </section>
  );
};
export default SavedNewsCardList;