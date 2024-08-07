import { useEffect } from "react";
import "./App.css";
import imageQueueService from "./services/imageQueueService";
import useImageAnnotationStore from "./stores/imageAnnotationStore";
import BoundingBoxDrawer from "./components/BoundingBoxDrawer/BoundingBoxDrawer";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const setQueueImages = useImageAnnotationStore(
    (state) => state.setQueueImages
  );

  const queueImages = useImageAnnotationStore((state) => state.queueImages);

  const setSelectedImage = useImageAnnotationStore(
    (state) => state.setSelectedImage
  );

  const fetchImageQueues = async () => {
    const data = await imageQueueService();

    if (data) {
      setQueueImages(data.slice(1));
      setSelectedImage(data[0]);
    }
  };

  useEffect(() => {
    fetchImageQueues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-content">
      <h1>Image Analyzer</h1>
      <div className="analyzer-container">
        <BoundingBoxDrawer />
        <Sidebar />
      </div>
      <div className="image-queue">
        <h2>Next images in queue:</h2>
        <ul className="queue-list">
          {queueImages.map((val) => {
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
