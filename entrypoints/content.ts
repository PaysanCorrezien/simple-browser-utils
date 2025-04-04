import { defineContentScript } from "#imports";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_idle",
  
  main() {
    // Listen for title update messages from the background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'updateTitle') {
        document.title = message.title;
      }
    });
  }
}); 