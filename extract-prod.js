const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('lighthouse-prod.json', 'utf8'));

  const score = data.categories.performance?.score * 100 || 'N/A';
  const fcp = data.audits['first-contentful-paint']?.displayValue || 'N/A';
  const lcp = data.audits['largest-contentful-paint']?.displayValue || 'N/A';
  const tbt = data.audits['total-blocking-time']?.displayValue || 'N/A';
  const cls = data.audits['cumulative-layout-shift']?.displayValue || 'N/A';
  const si = data.audits['speed-index']?.displayValue || 'N/A';

  const network = data.audits['network-requests']?.details?.items || [];
  const jsRequests = network.filter(req => req.resourceType === 'Script');
  const totalJsSize = jsRequests.reduce((sum, req) => sum + req.transferSize, 0) / 1024;
  
  const lcpElem = data.audits['largest-contentful-paint-element']?.details?.items?.[0] || {};
  const longTasks = data.audits['long-tasks']?.details?.items || [];
  const mainThread = data.audits['mainthread-work-breakdown']?.details?.items || [];
  const renderBlocking = data.audits['render-blocking-resources']?.details?.items || [];

  console.log(`=== PERFORMANCE METRICS ===`);
  console.log(`Performance Score: ${score}`);
  console.log(`FCP: ${fcp}`);
  console.log(`LCP: ${lcp}`);
  console.log(`TBT: ${tbt}`);
  console.log(`CLS: ${cls}`);
  console.log(`Speed Index: ${si}`);

  console.log(`\n=== JAVASCRIPT PAYLOAD ===`);
  console.log(`Total JS Transfer Size: ${totalJsSize.toFixed(2)} KB`);
  console.log(`Largest JS Resources:`);
  jsRequests
    .sort((a, b) => b.transferSize - a.transferSize)
    .slice(0, 5)
    .forEach(req => console.log(`- ${req.url}: ${(req.transferSize / 1024).toFixed(2)} KB`));

  console.log(`\n=== LCP ELEMENT ===`);
  console.log(`Element: ${lcpElem.node ? lcpElem.node.snippet : 'N/A'}`);
  console.log(`Resource (URL): ${lcpElem.url || 'N/A'}`);

  console.log(`\n=== MAIN THREAD WORK ===`);
  mainThread.forEach(work => {
    console.log(`- ${work.groupLabel}: ${work.duration.toFixed(1)} ms`);
  });

  console.log(`\n=== LONG TASKS ===`);
  longTasks.slice(0, 10).forEach(task => {
    console.log(`- Task: ${task.duration.toFixed(1)}ms (${task.url})`);
  });

  console.log(`\n=== RENDER-BLOCKING RESOURCES ===`);
  if (renderBlocking.length === 0) {
    console.log("None");
  } else {
    renderBlocking.forEach(rb => {
      console.log(`- ${rb.url} (Transfer size: ${(rb.totalBytes / 1024).toFixed(1)} KB)`);
    });
  }
} catch(e) {
  console.error("Error reading or parsing", e);
}
