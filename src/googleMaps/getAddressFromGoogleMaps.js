const axios = require("axios");

async function getAddressFromGoogleMaps(addressLink) {
  try {
    const latLngMatch = addressLink.match(/daddr=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (latLngMatch && latLngMatch.length === 3) {
      const latitude = latLngMatch[1];
      const longitude = latLngMatch[2];
      const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDlnZqM9x22u-w_DA9i43E9VzY6Alziyr4`;
      const reverseGeocodeResponse = await axios.get(reverseGeocodeUrl);
      console.log("Reverse Geocoding Response:", reverseGeocodeResponse.data); // Log the response
      const { results } = reverseGeocodeResponse.data;
      if (results && results.length > 0) {
        const addressComponents = results[0].address_components;
        const address = {};
        // Extract address components
        addressComponents.forEach((component) => {
          const types = component.types;
          types.forEach((type) => {
            switch (type) {
              case "street_number":
                address.number = component.long_name;
                break;
              case "route":
                address.street = component.long_name;
                break;
              case "postal_code":
                address.zip = component.long_name;
                break;
              case "locality":
                address.city = component.long_name;
                break;
              // Add more cases as needed
            }
          });
        });
        return address;
      }
    }
  } catch (error) {
    console.error("Error extracting address from Google Maps:", error);
  }
  return null;
}

module.exports = { getAddressFromGoogleMaps };