document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("newsContainer");
  const liveTitle = document.getElementById("liveTitle");
  const liveDescription = document.getElementById("liveDescription");
  const readMoreLive = document.getElementById("readMoreLive");

  // Fetch articles from JSON
  const fetchArticles = async () => {
    try {
      const response = await fetch("articles.json");
      const articles = await response.json();
      updateLiveArticle(articles[0]); // First article is the major live article
      renderArticles(articles.slice(1)); // Render the rest of the articles
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  };

  // Update live article
  const updateLiveArticle = (article) => {
    liveTitle.textContent = article.title;
    liveDescription.textContent = article.description;
    readMoreLive.addEventListener("click", () => {
      window.location.href = `article.html?id=${article.id}`;
    });
  };

  // Render remaining articles
  const renderArticles = (articles) => {
    newsContainer.innerHTML = articles
      .map(
        (article) => `
          <article class="article" onclick="location.href='article.html?id=${article.id}'">
            <img src="${article.image}" alt="${article.title}">
            <div class="content">
              <h2>${article.title}</h2>
              <p>${article.description}</p>
            </div>
          </article>
        `
      )
      .join("");
  };

  // Load the article for the article page
  const loadArticle = async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = parseInt(params.get("id"), 10);

    if (!articleId) return;

    try {
      const response = await fetch("articles.json");
      const articles = await response.json();
      const article = articles.find((a) => a.id === articleId);

      if (article) {
        document.getElementById("articleTitle").textContent = article.title;
        document.getElementById("articleImage").src = article.image;
        document.getElementById("articleContent").textContent = article.content;
      }
    } catch (error) {
      console.error("Error loading article:", error);
    }
  };

  // Initialize
  if (window.location.pathname.includes("article.html")) {
    loadArticle();
  } else {
    fetchArticles();
  }
});