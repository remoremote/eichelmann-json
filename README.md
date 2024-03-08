# Eichelmann Scraper

## Overview
This project is a comprehensive web scraping tool designed to collect, process, and store property listing data from the specified real estate website. Using Node.js, it navigates through property overview pages, scrapes detailed property data including images, addresses, and descriptions, processes and saves this data in both JSON and CSV formats, and stores it for further analysis or display.

## Features
- Scrape property listing details including price, area, and type of space.
- Retrieve property images and process them for extraction.
- Get structured address information via Google Maps scraping.
- Convert and save scraped data into JSON and CSV formats.
- Automatic storage of scraped data into a PostgreSQL database for persistent storage.
- 
## Installation
To set up the project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname
   
2. **Install Dependencies**

Make sure Node.js is installed on your system then run:
npm install

3. **Setup Environment Variables**

Create a 
.env
 file in the root directory and add database configuration variables:

DATABASE_URL=your_database_connection_string

Usage
To start the scraper, run the following command in your terminal:
npm start

This will initiate the scraping process based on the configuration set in your project files. The results will be saved into details.json and details.csv within your project directory.

How it Works
The scraping process is initiated by calling the main function, which orchestrates the entire operation starting from the overview page parsing, individual page data scraping, and down to saving processed data into files and a database.