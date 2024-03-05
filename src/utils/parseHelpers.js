function parsePrice(value) {
  const match = value.match(/(\d+)’?(\d*)/);
  return match ? parseInt(match[1] + match[2]) : 0;
}

function parseArea(value) {
  const match = value.match(/(\d+)’?(\d*)/);
  return match ? parseInt(match[1] + match[2]) : 0;
}

function parseSpaceType(value) {
  switch (value) {
    case "Einzelhandel":
      return "Commercial Space";
    case "Büro":
      return "Office Space";
    case "Ladenfläche":
      return "Retail Space";
    case "Lager":
      return "Commercial Space";
    default:
      return value;
  }
}

module.exports = {
  parsePrice,
  parseArea,
  parseSpaceType
};