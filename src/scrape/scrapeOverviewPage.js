const { fetchHTML } = require("../utils/fetchData");

const baseUrl = "https://casaframe.ch";
const overviewPath = "/de/publisher/S1eULf6tOHWAIeKpRsca2ozbdZJuhj3A/";

async function scrapeOverviewPage(pageNumber) {
  const pageUrl = `${baseUrl}${overviewPath}?page=${pageNumber}`;
  const $ = await fetchHTML(pageUrl);
  if (!$) return [];

  const links = [];
  $(".offer-item").each((i, elem) => {
    const link = $(elem).attr("href");
    if (link) {
      links.push(baseUrl + link);
    }
  });

  return links;
}

module.exports = { scrapeOverviewPage };