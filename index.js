const { fetchHTML } = require("./src/utils/fetchData");
const {
  parsePrice,
  parseArea,
  parseSpaceType,
} = require("./src/utils/parseHelpers");
const { saveDataToFile } = require("./src/utils/fileHelpers");
const { scrapePage } = require("./src/scrape/scrapePage");
const { scrapeImages } = require("./src/scrape/scrapeImages");
const { scrapeOverviewPage } = require("./src/scrape/scrapeOverviewPage");
const {
  getAddressFromGoogleMaps,
} = require("./src/googleMaps/getAddressFromGoogleMaps");
const {
  saveToJsonAndDatabase,
} = require("./src/database/saveToJsonAndDatabase");
const { jsonToCsv } = require("./src/csv/jsonToCsv");

async function main() {
  console.log("Starting main scraping function...");
  let allDetails = [];

  const maxPageNumber = 1; // Define maxPageNumber

  for (let i = 1; i <= maxPageNumber; i++) {
    const pageLinks = await scrapeOverviewPage(i);
    for (const link of pageLinks) {
      const details = await scrapePage(link);
      if (details) {
        allDetails.push(details);
      }
    }
  }

  allDetails = allDetails.filter((detail) => !("Kaufpreis" in detail));

  // Save to JSON and PostgreSQL database
  await saveToJsonAndDatabase(allDetails, "details.json");

  // Convert JSON data to CSV and save to file
  const csvData = jsonToCsv(allDetails);
  saveDataToFile(csvData, "details.csv");

  console.log("Main function completed.");
}

main();
