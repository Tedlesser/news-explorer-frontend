import "../SavedNews/SavedNews.css";
import Nav from "../Nav/Nav";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedCardList from "../SavedCardList/SavedCardList";
// import { pageAppearances } from "../../utils/pageAppearances";

function SavedNews({ isLoggedIn, handleLogout, handleDeleteArticle }) {
  const isInverse = pageAppearances.home === "dark";

  return (
    <div className="saved-news">
      <Nav
        isInverse={isInverse}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <SavedNewsHeader />
      <SavedCardList handleDeleteArticle={handleDeleteArticle} />
    </div>
  );
}

export default SavedNews;
