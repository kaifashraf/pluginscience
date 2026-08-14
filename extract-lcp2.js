const fs = require('fs');
try {
  const data = JSON.parse(fs.readFileSync('lighthouse-prod.json', 'utf8'));
  const lcpKeys = Object.keys(data.audits).filter(k => k.includes('lcp') || k.includes('largest-contentful-paint'));
  console.log("Keys:", lcpKeys);
  lcpKeys.forEach(k => {
    console.log(`\n--- ${k} ---`);
    console.log(JSON.stringify(data.audits[k].details, null, 2).substring(0, 500));
  });
} catch(e) { console.error(e); }
