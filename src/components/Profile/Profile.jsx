import React, { useState, useEffect } from "react";
import "./Profile.css";
import { auth } from "../../utils/auth"; // Import the function
import { getToken } from "../../utils/token"; // To get the token
import SavedCard from "../SavedCard/SavedCard";

const Profile = ({
  userData,
  handleCardClick,
  handleDeleteArticle,
  onCardLike,
  isLoggedIn,
  onCardDelete,
  savedArticles
}) => {
return (
    <div className="profile">
      <div>
        <p className="profile__label">Saved Articles</p>
        <h2 className="profile__title">
          {/* {userData.name}, you have {savedArticles.length} saved articles */}
        </h2>
        <div className="profile__keyword-search">
          By keywords:
          {/* <strong>{renderKeywordsSummary()}</strong> */}
        </div>
      </div>
      <ul className="saved-articles__list">
        {savedArticles.map((article, index) => (
          <li key={index} className="saved-articles__item">
            <SavedCard
              article={article}
              onCardClick={handleCardClick}
              handleDeleteArticle={handleDeleteArticle}
              onCardLike={onCardLike}
              isLiked={savedArticles.some((saved) => saved._id === article._id)}
              isLoggedIn={isLoggedIn}
              onCardDelete={onCardDelete}
            />
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;