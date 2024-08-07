import React, { useEffect, useState } from "react";
import "./App.css";
import imageQueueService, { ImageQueue } from "./services/imageQueueService";
import categoriesService, { Category } from "./services/categoriesService";
import BoundingBoxDrawer from "./components/BoundingBoxDrawer";

function App() {
  const [imageQueue, setImageQueue] = useState<ImageQueue[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageQueue | undefined>(
    undefined
  );
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

  const onSelectImageQueue = (img: ImageQueue) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    fetchImageQueues();
    fetchCategories();
  }, []);

  return (
    <div className="main-content">
      <h1>Image Analyzer</h1>
      <div className="analyzer-container">
        <BoundingBoxDrawer selectedImage={selectedImage} />
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
              <li
                key={`item-${val.id}`}
                className="queue-item"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectImageQueue(val);
                }}
              >
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
