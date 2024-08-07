import React, { useEffect, useState } from "react";
import "./App.css";
import imageQueueService, { ImageQueue } from "./services/imageQueueService";
import categoriesService, { Category } from "./services/categoriesService";

function App() {
  const [imageQueue, setImageQueue] = useState<ImageQueue[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchImageQueues = async () => {
    const data = await imageQueueService();

    if (data) {
      setImageQueue(data);
    }
  };

  const fetchCategories = async () => {
    const data = await categoriesService();

    if (data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchImageQueues();
    fetchCategories();
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
            {categories.map((val) => {
              return (
                <li key={val.id} className="">
                  {val.name}
                </li>
              );
            })}
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
