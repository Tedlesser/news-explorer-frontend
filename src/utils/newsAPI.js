const API_Key = "e472c102afbe4e59a1d92fc5bb218322";
const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Function that fetches new articles for search query
export const fetchNews = async (query) => {
  const endpoint = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&apiKey=${API_Key}&pageSize=100&from=${getFormattedDate(
    7
  )}&to=${getFormattedDate(0)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }

    const data = await response.json();

    console.log("Fetched articles from API:", data.articles);

    // Map through the articles to extract the necessary fields
    const articles = data.articles.map((article) => ({
      sourceName: article.source.name,
      title: article.title,
      publishedAt: formatDate(article.publishedAt),
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
    }));

    return articles;
  } catch (error) {
    throw error;
  }
};

// Formats the date for API query (7 days ago)
export const getFormattedDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

//Formats the date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export const api = {
  fetchNews,
  getFormattedDate,
  formatDate,
};
