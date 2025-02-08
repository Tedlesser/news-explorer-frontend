import { formatDate } from "../utils/newsAPI";

export function getItems() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        _id: "65f7368dfb74bd6a92114c85", // I just generated this at random from a mongodb id generator website
        title: "Some news article",
        url: "put some actual article URL here",
        // ...etc, whatever properties it's supposed to have
      },
      {
        _id: "65f7368dfb74bd6a92114c55", // I just generated this at random from a mongodb id generator website
        title: "Some news article",
        url: "some actual article URL here",
        // ...etc, whatever properties it's supposed to have
      },
      // and have however many you want to show on the saved-news page
    ])
  );
}

export function saveArticle(article) {
  // article is a result from the NewsAPI
  return new Promise((resolve, reject) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0", // another one made up from the generator
      urlToImage: article.urlToImage,
      title: article.title,
      publishedAt: formatDate(article.publishedAt),
      description: article.description,

      // whatever other properties from the newsAPI-given article object you saved to the database
    });
  });
}
