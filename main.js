const API_KEY = `e9ccff088ea44691aa102045cfab76e3`;
const getLatestNews = async ()=>{
    const url = new URL (`https://noona-news-api.netlify.app/`);
    const response = await fetch(url)
    const data = await response.json()
    let news = data.articles
    console.log("dddd",news)
};

getLatestNews();