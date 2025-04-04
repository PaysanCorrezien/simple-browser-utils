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
      <div className="popup-header">
        <h2>Tab Manager</h2>
      </div>
      
      <div className="popup-content">
        <div className="form-group">
          <label htmlFor="redirect-url" className="form-label">New Tab URL</label>
          <input
            id="redirect-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <div className="toggle-container">
            <label className="toggle-label" htmlFor="show-tab-numbers">
              <div className="toggle-switch">
                <input
                  id="show-tab-numbers"
                  type="checkbox"
                  checked={showTabNumbers}
                  onChange={(e) => setShowTabNumbers(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </div>
              <span className="toggle-text">Show tab numbers</span>
            </label>
          </div>
        </div>
        
        <button onClick={handleSave} className="save-button">
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

export default App;
