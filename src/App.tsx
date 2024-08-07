import React, { useEffect, useState } from "react";
import "./App.css";
import imageQueueService, { ImageQueue } from "./services/imageQueueService";

function App() {
  const [imageQueue, setImageQueue] = useState<ImageQueue[]>([]);

  const fetchImageQueue = async () => {
    const data = await imageQueueService();

    if (data) {
      setImageQueue(data);
    }
  };

  useEffect(() => {
    fetchImageQueue();
  }, []);

  return (
    <div className="main-content">
      <h1>Image Analyzer</h1>
      <div className="analyzer-container">
        <div className="image-container">
          <img
            src="https://dummyimage.com/280/c4c4c4/ffffff&text=frame"
            alt="Placeholder for uploaded image"
          />
          <div className="annotation"></div>
        </div>
        <div className="sidebar">
          <div className="search-bar">
            <input type="text" placeholder="Search options..." />
          </div>
          <ul className="options-list">
            <li className="highlight">Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
          <div className="buttons">
            <button>Discard</button>
            <button>Confirm</button>
          </div>
        </div>
      </div>
      <div className="image-queue">
        <h2>Next images in queue:</h2>
        <ul className="queue-list">
          {imageQueue.map((val) => {
            return (
              <li key={`item-${val.id}`} className="queue-item">
                <img
                  key={`item-image-${val.id}`}
                  className="queue-image"
                  src={val.url}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
