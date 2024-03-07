// netlify/functions/start-scraper.js
const { main } = require('../../index.js');
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    // Invoke the main function from your project's entry point
    await main();

    // Update button text
    await updateButtonText('Scraping Completed');

    // Respond with a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Scraper ran successfully." }),
    };
  } catch (error) {
    console.error("Error running scraper:", error);
    // Respond with an error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to run scraper." }),
    };
  }
};

async function updateButtonText(buttonText) {
  try {
    const response = await fetch('https://eichelmann.netlify.app/update-button-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buttonText }),
    });

    if (!response.ok) {
      throw new Error('Failed to update button text');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error updating button text:', error.message);
  }
}
