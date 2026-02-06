const fs = require('fs');
const path = 'src/assets/data/content.json';

try {
    const fileContent = fs.readFileSync(path, 'utf8');
    console.log('File read successfully.');
    JSON.parse(fileContent);
    console.log('JSON is valid.');
} catch (err) {
    console.error('Error:', err.message);
}
