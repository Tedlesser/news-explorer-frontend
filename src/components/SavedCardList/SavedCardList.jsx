import React from "react";
import "./SavedCardList.css"; // Assuming you will have a separate CSS file for SavedCards
import NewsCard from "../NewsCard/NewsCard";

const SavedCardList = ({ savedArticles, onCardDelete, article, handleCardLike }) => {
  const handleDeleteClick = () => {
    onCardDelete(article); // Call the delete function passed from props
  };

  return (
    <div className="saved-cards">
      {savedArticles?.map((article) => (
        <NewsCard 
        key={article._id} 
        article={article} 
        onCardLike={handleCardLike} 
        onCardDelete={onCardDelete} 
        savedArticles={savedArticles}
      />
      ))}
    </div>
  );
};

export default SavedCardList;
