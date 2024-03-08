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

## Data Fields

The following table describes the data fields extracted by the scraper, including both static and dynamically named fields based on the content:

| Key                  | Description                                   | Type            |
|----------------------|-----------------------------------------------|-----------------|
| `address`            | Nested address details                        | Object          |
| `metaTitle`          | Property listing title                        | String          |
| `descriptionHTML`    | HTML description of the property              | String          |
| `descriptionMarkdown`| Markdown-converted property description       | String          |
| `totalArea`          | Zip code or total usable area                 | String/Number   |
| `systemOfficeId`     | Internal system ID                            | String          |
| `dateRent`           | Availability date                             | String          |
| `stockwerk`          | Floor number                                  | Number          |
| `price`              | Rental or purchase price                      | Number          |
| `monthlyPrice`       | Combined net and gross rental price           | Number          |
| `spaceType`          | Type of space                                 | String          |
| `address_street`     | Street part of the address                    | String (Dynamic)|
| `address_city`       | City part of the address                      | String (Dynamic)|
| `address_zipcode`    | Zipcode part of the address                   | String (Dynamic)|
| `address_country`    | Country part of the address                   | String (Dynamic)|
| `images_1`,...       | URLs of scraped images                        | String (Dynamic)|

Please note that the keys for the nested address object (`address_street`, `address_city`, etc.) and the dynamically named image keys (`images_1`, `images_2`, ...) are examples and may vary based on the actual data scraped and how many images are available per listing.