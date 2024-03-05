const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeImages(link, imageCount) {
  const images = [];

  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    // Parse the background-image CSS property to extract the image URLs
    $(".responsive-image").each((index, element) => {
      const backgroundImage = $(element).attr("style");
      const imageUrl = backgroundImage.match(/url\('([^']+)'\)/)[1];
      images.push(imageUrl);
    });
  } catch (error) {
    console.error("Error scraping images:", error);
  }

  return images;
}

module.exports = { scrapeImages };