// Get the redirect URL from storage
chrome.storage.sync.get(['redirectUrl'], (result) => {
  if (result.redirectUrl) {
    // Redirect to the saved URL
    window.location.href = result.redirectUrl;
  }
}); 