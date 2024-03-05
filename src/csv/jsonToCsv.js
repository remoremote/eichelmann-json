function jsonToCsv(jsonArray) {
  if (jsonArray.length === 0) return '';

  // Process headers for CSV - handling nested objects and arrays
  const headers = new Set();
  jsonArray.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key === 'address') {
        // Decompound the address object into individual components
        Object.keys(item[key]).forEach(subKey => {
          headers.add(`${key}_${subKey}`);
        });
      } else if (key === 'images') {
        // Handle images differently by noting how many there might be
        for (let i = 0; i < item[key].length; i++) {
          headers.add(`${key}_${i + 1}`);
        }
      } else {
        headers.add(key);
      }
    });
  });

  // Convert the Set of headers to an array for easier manipulation
  const headersArray = Array.from(headers);

  // Generating CSV rows from data
  const csvLines = jsonArray.map(item => {
    return headersArray.map(header => {
      // Handle nested address object
      if (header.startsWith('address_')) {
        const [ , subKey ] = header.split('_');
        return `"${item.address[subKey]?.toString().replace(/"/g, '""') || ''}"`;
      }
      // Handle images array
      else if (header.startsWith('images_')) {
        const index = parseInt(header.split('_')[1], 10) - 1;
        return index < item.images.length ? `"${item.images[index].toString().replace(/"/g, '""')}"` : '';
      }
      // Handle regular fields
      else {
        return item[header] ? `"${item[header].toString().replace(/"/g, '""')}"` : '';
      }
    }).join(',');
  });

  // Prepend the headers to the CSV content
  const csvContent = [headersArray.join(',')].concat(csvLines).join('\n');

  return csvContent;
}

module.exports = { jsonToCsv };