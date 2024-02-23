// import {writeFile} from 'fs';

const fs = require('fs/promises');
(async function fetchData() {
    try {
      const response = await fetch('http://localhost:8080/getConfig');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('Data fetched successfully:', data.configurationList);
    fs.writeFile('../assets/route-config.json', data.configurationList, (err) => {
      if (err) {
        console.error('Error updating JSON file:', err);
      } else {
        console.log('JSON file updated successfully.');
      }
    });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  })()
