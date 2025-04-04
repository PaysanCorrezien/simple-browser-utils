import { defineBackground } from '#imports';

export default defineBackground(() => {
  console.log('Background script started');
  
  chrome.tabs.onCreated.addListener((tab) => {
    console.log('New tab created:', tab.url);
    
    // Only redirect if it's a new tab (chrome://newtab)
    if (tab.url === 'chrome://newtab/') {
      console.log('New tab detected, checking for redirect URL');
      chrome.storage.sync.get(['redirectUrl'], (result) => {
        console.log('Redirect URL from storage:', result.redirectUrl);
        if (result.redirectUrl) {
          console.log('Redirecting to:', result.redirectUrl);
          chrome.tabs.update(tab.id!, { url: result.redirectUrl });
        } else {
          console.log('No redirect URL set');
        }
      });
    }
  });
}); 