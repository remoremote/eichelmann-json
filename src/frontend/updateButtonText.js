// src/frontend/updateButtonText.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Adjust to use the correct port

app.use(bodyParser.json());

app.post('/update-button-text', (req, res) => {
  const { buttonText } = req.body;

  // Update HTML content
  const htmlPath = path.resolve(__dirname, '../index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  htmlContent = htmlContent.replace(/<a.*?class="link-button".*?>.*?<\/a>/, `<a href="#" class="link-button">${buttonText}</a>`);
  fs.writeFileSync(htmlPath, htmlContent);

  res.send('Button text updated successfully');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
