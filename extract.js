const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

  const lcpElem = data.audits['largest-contentful-paint-element']?.details?.items?.[0] || {};
  const tbt = data.audits['total-blocking-time']?.displayValue || 'N/A';
  const lcp = data.audits['largest-contentful-paint']?.displayValue || 'N/A';
  const fcp = data.audits['first-contentful-paint']?.displayValue || 'N/A';

  const longTasks = data.audits['long-tasks']?.details?.items || [];
  const bootup = data.audits['bootup-time']?.details?.items || [];
  const network = data.audits['network-requests']?.details?.items || [];
  const unusedJs = data.audits['unused-javascript']?.details?.items || [];

  console.log("=== Basic Metrics ===");
  console.log("LCP:", lcp);
  console.log("FCP:", fcp);
  console.log("TBT:", tbt);

  console.log("\n=== LCP Element ===");
  console.log(JSON.stringify(lcpElem, null, 2));

  console.log("\n=== JS Bootup (TBT contributors) ===");
  bootup.slice(0, 10).forEach(item => {
    console.log(`${item.url}: Total ${item.total.toFixed(1)}ms, Scripting ${item.scripting.toFixed(1)}ms`);
  });

  console.log("\n=== Top Long Tasks ===");
  longTasks.slice(0, 10).forEach(task => {
    console.log(`Task: ${task.duration.toFixed(1)}ms - URL: ${task.url}`);
  });

  console.log("\n=== Largest Network Requests ===");
  const sortedNetwork = [...network].sort((a, b) => b.resourceSize - a.resourceSize).slice(0, 15);
  sortedNetwork.forEach(req => {
    console.log(`${req.url} - Size: ${(req.resourceSize / 1024).toFixed(1)}KB - Duration: ${req.endTime - req.startTime} - Priority: ${req.priority} - Type: ${req.resourceType}`);
  });
  
} catch(e) {
  console.error("Error reading or parsing", e);
}
