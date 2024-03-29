const API_KEY = `e9ccff088ea44691aa102045cfab76e3`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(`https://noona-news-api.netlify.app/top-headlines`);
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

const getNews = async () => {
  try {
    url.searchParams.set("page",page) 
    url.searchParams.set("pageSize",pageSize)

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      newsList = data.articles;
      totalResults = data.totalResults
      render();
      paginationRender();
    } else {
      throw new Error("data.message");
    }
  } catch (error) {
    errorRender(error.message)
  }
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const toggleSearch = () => {
  const searchContainer = document.getElementById("searchContainer");
  if (searchContainer.style.display === "none") {
    searchContainer.style.display = "block";
  } else {
    searchContainer.style.display = "none";
  }
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};
const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = '';

  if (page !== 1) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(1)">First</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${page - 1})">Previous</a>
      </li>
    `;
  }
  
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})">
        <a class="page-link">${i}</a>
      </li>
    `;
  }
  
  if (page !== totalPages) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${page + 1})">Next</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${totalPages})">Last</a>
      </li>
    `;
  }
  
  document.querySelector(".pagination").innerHTML = paginationHTML;
};


const getLatestNews = async () => {
  url = new URL(`https://noona-news-api.netlify.app/top-headlines`);
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://noona-news-api.netlify.app/top-headlines?category=${category}`
  );
  getNews();
};

const search = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  url = new URL(
    `https://noona-news-api.netlify.app/top-headlines?q=${keyword}`
  );
  getNews();
};

document.getElementById("search-button").addEventListener("click", search);

const render = () => {
  if (!newsList.length) {
    const newsBoard = document.getElementById("news-board");
    newsBoard.innerHTML =
      "<p style='text-align: center; font-weight: regular; font-size: 2em;'>No matches for your search.</p>";
    newsBoard.style.backgroundColor = "pink";
    newsBoard.style.borderRadius = "10px";
    return;
  }

  const newsHTML = newsList
    .map((news) => {
      const imageUrl = news.urlToImage;
      const title = news.title || "No title available";
      const description = news.description || "내용없음";
      const sourceName = news.source ? news.source.name : "no source";
      const publishedAt = news.publishedAt
        ? moment(news.publishedAt).fromNow()
        : "Unknown date";
      const truncatedDescription =
        description.length > 200
          ? description.substring(0, 200) + "..."
          : description;

      return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size" src="${
            imageUrl ||
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
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const moveToPage=(pageNum)=>{
  console.log("movetopage",pageNum)
  page=pageNum
  getNews()
};

getLatestNews();
