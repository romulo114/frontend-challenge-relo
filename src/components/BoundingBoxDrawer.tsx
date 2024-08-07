import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { ImageQueue } from "../services/imageQueueService";

type Props = {
  selectedImage: ImageQueue | undefined;
  onBoundingBoxChange?: (boundingBox: BoundingBox | null) => void;
};

type BoundingBox = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const BoundingBoxDrawer = ({ selectedImage, onBoundingBoxChange }: Props) => {
  const imgWrapperRef = useRef<HTMLImageElement>(null);
  const [boundingBox, setBoundingBox] = useState<BoundingBox | null>(null);
  const [isAnnotate, setIsAnnotate] = useState<boolean>(false);

  // Handle mouse down event to start drawing bounding box
  const handleMouseDown = (e: MouseEvent<HTMLImageElement>) => {
    if (!imgWrapperRef.current) return;

    // Get the bounding rectangle of the image
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    // Initialize the bounding box state
    setBoundingBox({ startX, startY, endX: startX, endY: startY });
    setIsAnnotate(true);
  };

  // Handle mouse move event to update the bounding box dimensions
  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    if (!boundingBox || !imgWrapperRef.current) return;

    // If not in annotation mode, means no need to update the bounding box dimensions
    if (!isAnnotate) return;

    // Get the bounding rectangle of the image
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    // Update the bounding box dimensions state
    setBoundingBox((prev) => (prev ? { ...prev, endX, endY } : null));
  };

  // Handle mouse up event to finalize the bounding box,
  // so the annotate only created by click and drag
  const handleMouseUp = () => {
    if (onBoundingBoxChange) {
      onBoundingBoxChange(boundingBox);
    }
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
  }, [boundingBox]);

  return (
    <div
      ref={imgWrapperRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="image-container"
      style={{ position: "relative" }}
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
      {boundingBox && (
        <div
          style={{
            position: "absolute",
            border: "2px solid red",
            left: `${boundingBox.startX}px`,
            top: `${boundingBox.startY}px`,
            width: `${boundingBox.endX - boundingBox.startX}px`,
            height: `${boundingBox.endY - boundingBox.startY}px`,
          }}
        />
      )}
    </div>
  );
};

export default BoundingBoxDrawer;
