import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [showTabNumbers, setShowTabNumbers] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load saved settings when popup opens
  useEffect(() => {
    chrome.storage.sync.get(['redirectUrl', 'showTabNumbers'], (result) => {
      if (result.redirectUrl) {
        setUrl(result.redirectUrl);
      }
      if (result.showTabNumbers !== undefined) {
        setShowTabNumbers(result.showTabNumbers);
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.sync.set({ 
      redirectUrl: url,
      showTabNumbers: showTabNumbers
    }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
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
      </div>
      <div className="toggle-group">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showTabNumbers}
            onChange={(e) => setShowTabNumbers(e.target.checked)}
          />
          <span>Show tab numbers</span>
        </label>
      </div>
      <button onClick={handleSave} className="save-button">
        Save
      </button>
      {saved && <p className="saved-message">Settings saved!</p>}
    </div>
  );
}

export default App;
