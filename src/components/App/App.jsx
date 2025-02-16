import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { fetchNews } from "../../utils/newsAPI";
import { setToken, removeToken } from "../../utils/token";
import {authorize, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {getItems, saveArticle} from "../../utils/ThirdPartyApi";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const showMoreArticles = () => {
    setVisibleArticles((prev) => prev + 3);
  };
  const [savedArticles, setSavedArticles] = useState([]);
  const isSavedNews = location.pathname === "/saved-news"

  console.log(isLoggedIn);

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const handleRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = (values) => {
    if (!values) {
      return;
    }
    authorize(values)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        if (res.token) {
          authorize(res).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
          });
        }
      })
      .catch((err) => {
        console.error("Failed attempt to login", err);
      });
  };

  const handleRegistration = (values) => {
    if (!values) return;

    checkToken(values)
      .then((res) => {
        console.log(res);
        localStorage.addItem("jwt");
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        closeActiveModal();
        setActiveModal("success");
      })
      .catch((res) => {
        console.log(`There is an error in handleUserRegistration: ${res}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
    removeToken();
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);


  

  // Handle saving (liking) articles
  const handleCardLike = (article) => {
    const token = getItems();
    console.log(token)
    if (!token) return;
    // console.log(article);
    const articleId = saveArticle(article);
    article.articleId = articleId;
    console.log(article.articleId);

    // Attach the keywords (from searchQuery) to the article
    article.keywords = searchQuery.split(" "); // Split search query into individual keywords

    // console.log("Article with attached keywords:", article.keywords.slice(0,2)); // Log the article with keywords for confirmation

    saveArticle(article, token) // Pass the articleId and article object to the API
      .then((likedArticle) => {
        setSavedArticles([...savedArticles, likedArticle]); // Add saved article to state
      })
      .catch(console.error);
  };

  const handleCardDelete = (article) => {
    const token = getToken();
    if (!token) return;

    // Find the matching article in savedArticles by comparing URLs
    const savedArticle = savedArticles.find(
      (saved) => saved.url === article.url
    );

    if (savedArticle) {
      const articleId = savedArticle._id; // Use MongoDB _id from savedArticles

      // Call the backend to delete the article by its _id
      Auth
        .deleteArticle(articleId, token) // API call to delete the article by _id
        .then(() => {
          console.log("Article deleted:", articleId);
          // Remove the article from savedArticles state
          setSavedArticles((prevArticles) =>
            prevArticles.filter((a) => a._id !== articleId)
          );
        })
        .catch((error) => {
          console.error("Error deleting article:", error);
        });
    } else {
      console.log("No matching saved article found for deletion.");
    }
  };

  // Handle search logic
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSubmitted(true);
    setSearchQuery(searchQuery);

    console.log("Search query captured:", searchQuery);

    try {
      const news = await fetchNews(searchQuery);

      console.log("Fetched articles for query:", news); // Log fetched articles to ensure data is coming through

      setArticles(news);
      if (news.length === 0) {
        setError("No articles found for this query.");
      }
    } catch (err) {
      setError("Sorry, something went wrong during the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={userContext}>
            <div className={isSavedNews ? "page__content_saved-news-active" : "page__content"}>
              <Header 
                handleLoginClick={handleLoginClick} 
                handleLogin={handleLogin} 
                isLoggedIn={isLoggedIn} 
                handleLogout={handleLogout}/>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Main
                        handleLoginClick={handleLoginClick}
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                        isLoading={isLoading}
                        handleSearch={handleSearch}
                        isSubmitted={isSubmitted}
                        articles={articles}
                        error={error}
                        handleCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        savedArticles={savedArticles}
                        searchQuery={searchQuery}
                        visibleArticles={visibleArticles}
                        showMoreArticles={showMoreArticles}
                      />
                    </>
                  }
                />
                <Route
                  path="/saved-news"
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      setActiveModal={setActiveModal}
                    >
                      <SavedNewsHeader
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                        savedArticles={savedArticles}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              {/* {location.pathname !== "/saved-news" && <About/>} */}
              <Footer />
              <LoginModal
                isOpen={activeModal === "login"}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
                handleLogin={handleLogin}
                onLogin={handleLogin}
                handleRegisterModal={handleRegisterModal}
              />
              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
                handleLoginModal={handleLoginModal}
                handleRegistration={handleRegistration}
              />
            </div>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;