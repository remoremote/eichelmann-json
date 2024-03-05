const fs = require("fs");

async function saveToJsonAndDatabase(data, filename) {
  // Save to JSON file
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error("Error saving data to JSON file:", error);
  }
}

module.exports = { saveToJsonAndDatabase };