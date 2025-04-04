const redirectUrlInput = document.getElementById('redirectUrl') as HTMLInputElement;
const saveButton = document.getElementById('save') as HTMLButtonElement;

// Load saved URL when page opens
chrome.storage.sync.get(['redirectUrl'], (result) => {
  if (result.redirectUrl) {
    redirectUrlInput.value = result.redirectUrl;
  }
});

// Save URL when button is clicked
saveButton.addEventListener('click', () => {
  const url = redirectUrlInput.value;
  if (url) {
    chrome.storage.sync.set({ redirectUrl: url }, () => {
      alert('Settings saved!');
    });
  }
}); 