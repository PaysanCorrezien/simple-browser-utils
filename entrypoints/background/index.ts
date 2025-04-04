import { defineBackground } from '#imports';

export default defineBackground({
  async main() {
    // Function to update tab titles with numbers
    async function updateTabNumbers() {
      try {
        const result = await chrome.storage.sync.get(['showTabNumbers']);
        const showTabNumbers = result.showTabNumbers as boolean;
        
        // Get all tabs in current window
        const tabs = await chrome.tabs.query({ currentWindow: true });
        
        // Update each tab's title
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i];
          if (!tab.id) continue;
          
          try {
            // Execute script in tab to update title and add styles
            await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (index: number, shouldShow: boolean) => {
                // Remove existing style if any
                const existingStyle = document.getElementById('tab-number-style');
                if (existingStyle) {
                  existingStyle.remove();
                }

                if (shouldShow) {
                  // Add custom style for tab numbers
                  const style = document.createElement('style');
                  style.id = 'tab-number-style';
                  style.textContent = `
                    title {
                      font-weight: bold !important;
                    }
                    /* This ensures the number is visible in the tab */
                    .tab-number {
                      font-weight: bold;
                      font-size: 1.2em;
                      color: #000;
                    }
                  `;
                  document.head.appendChild(style);
                }

                // Update title with styled number
                const originalTitle = document.title.replace(/^\d+\.\s*/, '');
                if (shouldShow) {
                  const number = index + 1;
                  document.title = `${number}. ${originalTitle}`;
                } else {
                  document.title = originalTitle;
                }
              },
              args: [i, showTabNumbers]
            });

            // Also update the tab's title in Chrome's internal state
            if (tab.title) {
              const originalTitle = tab.title.replace(/^\d+\.\s*/, '');
              const newTitle = showTabNumbers ? `${i + 1}. ${originalTitle}` : originalTitle;
              if (newTitle !== tab.title) {
                chrome.tabs.sendMessage(tab.id, { type: 'updateTitle', title: newTitle });
              }
            }
          } catch (error) {
            // Ignore errors for special pages that can't be injected into
            console.debug('Could not update tab title:', error);
          }
        }
      } catch (error) {
        console.error('Error updating tab numbers:', error);
      }
    }

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.showTabNumbers) {
        updateTabNumbers();
      }
    });

    // Update when tabs change
    chrome.tabs.onActivated.addListener(updateTabNumbers);
    chrome.tabs.onRemoved.addListener(updateTabNumbers);
    chrome.tabs.onMoved.addListener(updateTabNumbers);
    chrome.tabs.onCreated.addListener(updateTabNumbers);
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      // Only update if the title has changed or the tab has finished loading
      if (changeInfo.title || changeInfo.status === 'complete') {
        updateTabNumbers();
      }
    });

    // Initial update for existing tabs
    updateTabNumbers();
  }
}); 