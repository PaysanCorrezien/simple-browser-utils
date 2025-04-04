import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState(false);

  // Load saved URL when popup opens
  useEffect(() => {
    chrome.storage.sync.get(['redirectUrl'], (result) => {
      if (result.redirectUrl) {
        setUrl(result.redirectUrl);
      }
    });
  }, []);

  const handleSave = () => {
    if (url) {
      chrome.storage.sync.set({ redirectUrl: url }, () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      });
    }
  };

  return (
    <div className="popup-container">
      <h2>New Tab Redirect</h2>
      <div className="input-group">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to redirect to"
          className="url-input"
        />
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
      {saved && <p className="saved-message">Settings saved!</p>}
    </div>
  );
}

export default App;
