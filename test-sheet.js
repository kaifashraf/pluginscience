const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwE6z3NeoQ3pw5yiGsHRxLvANMYngOLgNxxkqv_KVSVLetmMlGtP7083QuJ7ftfKHpv/exec';
const SHEET_SECRET_TOKEN = 'PLUGINSCIENCE_VOLUNTEER2003';

async function testSheet() {
  console.log("Sending test request to Google Apps Script...");
  try {
    const sheetRes = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        token: SHEET_SECRET_TOKEN,
        name: "Test User", 
        email: "test@example.com", 
        phone: "1234567890", 
        college: "Test College", 
        year: "1st Year", 
        role: "Developer", 
        why: "Testing the sheet connection",
        resumeBase64: "",
        resumeFileName: "",
        resumeMimeType: "",
      })
    });
    
    const text = await sheetRes.text();
    console.log("RESPONSE FROM APPS SCRIPT:");
    console.log(text);
  } catch (err) {
    console.error("Error:", err);
  }
}

testSheet();
