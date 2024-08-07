import { useEffect, useState } from "react";
import "./App.css";
import imageQueueService, { ImageQueue } from "./services/imageQueueService";
import BoundingBoxDrawer from "./components/BoundingBoxDrawer";
import Categories from "./components/Categories";

function App() {
  const [imageQueue, setImageQueue] = useState<ImageQueue[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageQueue | undefined>(
    undefined
  );

  const fetchImageQueues = async () => {
    const data = await imageQueueService();

    if (data) {
      setImageQueue(data);
    }
  };

  const onSelectImageQueue = (img: ImageQueue) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    fetchImageQueues();
  }, []);

  return (
    <div className="main-content">
      <h1>Image Analyzer</h1>
      <div className="analyzer-container">
        <BoundingBoxDrawer selectedImage={selectedImage} />
        <Categories />
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
