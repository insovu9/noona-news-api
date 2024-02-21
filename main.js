const API_KEY = `e9ccff088ea44691aa102045cfab76e3`;
let newsList = [];

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

const getLatestNews = async () => {
  const url = new URL(`https://noona-news-api.netlify.app/top-headlines`);
  // const url = new URL (`https://newsapi.org/v2/everything?q=Apple&from=2024-02-21&sortBy=popularity&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

const render = () => {
  if (!newsList.length) {
    document.getElementById("news-board").innerHTML = "<p>No news available</p>";
    return;
  }

  const newsHTML = newsList.map((news) => {
    const imageUrl = news.urlToImage ;
    
    const title = news.title || 'No title available';
    const description = news.description || '내용없음';
    const sourceName = news.source ? news.source.name : 'no source';
    const publishedAt = news.publishedAt ? moment(news.publishedAt).fromNow() : 'Unknown date';
    const truncatedDescription = description.length > 200 ? description.substring(0, 200) + "..." : description;

    return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size" src="${imageUrl ||
          "https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"
}" />
        </div>
        <div class="col-lg-8">
          <h2>${title}</h2>
          <p>${truncatedDescription}</p>
          <div>${sourceName} * ${publishedAt}</div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
