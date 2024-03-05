const { fetchHTML } = require("../utils/fetchData");
const {
  getAddressFromGoogleMaps,
} = require("../googleMaps/getAddressFromGoogleMaps");
const { scrapeImages } = require("./scrapeImages");
const TurndownService = require("turndown");
const {
  parsePrice,
  parseArea,
  parseSpaceType,
} = require("../utils/parseHelpers");

const turndownService = new TurndownService();

async function scrapePage(link) {
  const $ = await fetchHTML(link);
  if (!$) return null;

  const details = {};

  // Scrape address details
  const addressLink = $(
    ".btn.config-bg-primary.form-control.config-border-radius.contact-map-link",
  ).attr("href");
  if (addressLink) {
    // Extract address components from the Google Maps link
    const addressComponents = await getAddressFromGoogleMaps(addressLink);
    details.address = addressComponents;
  }

  // Scrape title
  details.metaTitle = $(".offer-title").text().trim(); // metaTitle is replacing title

  // Scrape description
  details.descriptionHTML = $(".descriptions").html(); // Store HTML description
  details.descriptionMarkdown = turndownService.turndown(
    details.descriptionHTML,
  ); // Convert HTML to Markdown
  details.descriptionMarkdown = `### ${details.metaTitle}\n\n${details.descriptionMarkdown}`; // Adding title to description

  // Scrape property information
  $(".property-info tr").each((i, elem) => {
    const key = $(elem).find("th").text().trim();
    let value = $(elem).find("td").text().trim();

    // Adjusting key names and values
    switch (key) {
      case "zip":
        details.totalArea = value; // Changing key name
        break;
      case "Referenz":
        details.systemOfficeId = value; // Changing key name
        break;
      case "Verfügbar ab":
        details.dateRent = value; // Changing key name
        break;
      case "Etage":
        details.stockwerk = parseInt(value) || 0; // Changing key name and parsing value to number
        break;
      case "Nettomiete":
        details.price = parsePrice(value); // Changing key name and parsing value to number
        break;
      case "Bruttomiete":
        details.monthlyPrice = parsePrice(value); // Changing key name and parsing value to number
        break;
      case "Nutzfläche":
        details.totalArea = parseArea(value); // Changing key name and parsing value to number
        break;
      case "Raumhöhe":
      case "Mietkaution":
        // Ignore these keys
        break;
      case "Kategorie":
        details.spaceType = parseSpaceType(value); // Changing key name
        break;
      default:
        details[key] = value;
        break;
    }
  });

  // If price, Nettomiete, or Bruttomiete keys don't exist, set price to 0
  if (!details.price && !details.monthlyPrice) {
    details.price = 0;
  }

  // Scrape images
  const imageCount = $(".image-count.slider-label").text().trim();
  const images = await scrapeImages(link, imageCount);

  details.images = images;

  return details;
}

module.exports = { scrapePage };
