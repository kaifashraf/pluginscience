const fs = require('fs');
try {
  const data = JSON.parse(fs.readFileSync('lighthouse-prod.json', 'utf8'));
  const elem = data.audits['largest-contentful-paint-element'];
  console.log(JSON.stringify(elem.details, null, 2));
} catch(e) { console.error(e); }
