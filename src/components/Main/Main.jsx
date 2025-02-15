import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Results from "../Results/Results"; 

function Main({ 
    handleSearch, 
    isLoading, 
    error, 
    articles, 
    handleCardDelete, 
    handleCardLike,
    savedArticles, 
    searchQuery, 
    visibleArticles, 
    showMoreArticles, 
    isLoggedIn, 
    isSubmitted
}) {
  return (
    <main className="main">
      <h1 className="main__title">What's going on in the world?</h1>
      <p className="main__subtitle">
        Find the news on any topic and save them in your personal account.
      </p>
      <SearchForm handleSearch={handleSearch} />
      {isSubmitted && (
        <Results
          isLoading={isLoading}
          error={error}
          articles={articles}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          savedArticles={savedArticles}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          visibleArticles={visibleArticles}
          showMoreArticles={showMoreArticles}
          isLoggedIn={isLoggedIn}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
