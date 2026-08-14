const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

  const lcpElem = data.audits['largest-contentful-paint-element'] || {};
  console.log("\n=== LCP Element Details ===");
  console.log(JSON.stringify(lcpElem.details, null, 2));
  
} catch(e) {
  console.error("Error reading or parsing", e);
}
