import { useRef, useState, useEffect, MouseEvent } from "react";
import useImageAnnotationStore from "../stores/imageAnnotationStore";

const BoundingBoxDrawer = () => {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const [isAnnotate, setIsAnnotate] = useState<boolean>(false);
  const addBoundingBox = useImageAnnotationStore(
    (state) => state.addBoundingBox
  );

  const updateBoundingBox = useImageAnnotationStore(
    (state) => state.updateBoundingBox
  );

  const boundingBoxes = useImageAnnotationStore((state) => state.boundingBoxes);

  const selectedImage = useImageAnnotationStore((state) => state.selectedImage);

  // Handle mouse down event to start drawing bounding box
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!imgWrapperRef.current) return;

    // Get the bounding rectangle of the image
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    // Initialize the bounding box state
    addBoundingBox({ startX, startY, endX: startX, endY: startY });
    setIsAnnotate(true);
  };

  // Handle mouse move event to update the bounding box dimensions
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!imgWrapperRef.current) return;

    // If not in annotation mode, means no need to update the bounding box dimensions
    if (!isAnnotate) return;

    // Get the bounding rectangle of the image
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Update the bounding box dimensions state
    updateBoundingBox({
      startX: boundingBoxes[boundingBoxes.length - 1].startX,
      startY: boundingBoxes[boundingBoxes.length - 1].startY,
      endX: currentX,
      endY: currentY,
    });
  };

  // Handle mouse up event to finalize the bounding box,
  // so the annotate only created by click and drag
  const handleMouseUp = () => {
    setIsAnnotate(false);
  };

  // Add and clean up event listener for mouseup event on the document
  useEffect(() => {
    const handleMouseUpDocument = () => handleMouseUp();
    document.addEventListener("mouseup", handleMouseUpDocument);

    // Clean up event listener on component unmount or boundingBox change
    return () => {
      document.removeEventListener("mouseup", handleMouseUpDocument);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={imgWrapperRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="image-container"
      style={{
        position: "relative",
        userSelect: "none",
      }}
      draggable={"false"}
    >
      <img
        src={
          selectedImage
            ? selectedImage.url
            : "https://dummyimage.com/280/c4c4c4/ffffff&text=frame"
        }
        draggable={"false"}
        alt="Placeholder for uploaded image"
      />
      {boundingBoxes.map((val) => {
        return (
          <div
            style={{
              position: "absolute",
              border: "2px solid red",
              left: `${Math.min(val.startX, val.endX)}px`,
              top: `${Math.min(val.startY, val.endY)}px`,
              width: `${Math.abs(val.endX - val.startX)}px`,
              height: `${Math.abs(val.endY - val.startY)}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default BoundingBoxDrawer;
