import React, { useRef, useState, useEffect, MouseEvent } from "react";
import useImageAnnotationStore from "../stores/imageAnnotationStore";

type BoundingBox = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const BoundingBoxDrawer = () => {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const [boundingBox, setBoundingBox] = useState<BoundingBox | null>(null);
  const [isAnnotate, setIsAnnotate] = useState<boolean>(false);
  const addBoundingBox = useImageAnnotationStore(
    (state) => state.addBoundingBox
  );

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
    setBoundingBox({ startX, startY, endX: startX, endY: startY });
    setIsAnnotate(true);
  };

  // Handle mouse move event to update the bounding box dimensions
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!boundingBox || !imgWrapperRef.current) return;

    // If not in annotation mode, means no need to update the bounding box dimensions
    if (!isAnnotate) return;

    // Get the bounding rectangle of the image
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Update the bounding box dimensions state
    setBoundingBox({
      startX: boundingBox.startX,
      startY: boundingBox.startY,
      endX: currentX,
      endY: currentY,
    });
  };

  // Handle mouse up event to finalize the bounding box,
  // so the annotate only created by click and drag
  const handleMouseUp = () => {
    if (boundingBox) {
      addBoundingBox({
        topLeftX: Math.min(boundingBox.startX, boundingBox.endX),
        topLeftY: Math.min(boundingBox.startY, boundingBox.endY),
        width: Math.abs(boundingBox.endX - boundingBox.startX),
        height: Math.abs(boundingBox.endY - boundingBox.startY),
      });
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
      {boundingBox && (
        <div
          style={{
            position: "absolute",
            border: "2px solid red",
            left: `${Math.min(boundingBox.startX, boundingBox.endX)}px`,
            top: `${Math.min(boundingBox.startY, boundingBox.endY)}px`,
            width: `${Math.abs(boundingBox.endX - boundingBox.startX)}px`,
            height: `${Math.abs(boundingBox.endY - boundingBox.startY)}px`,
          }}
        />
      )}
    </div>
  );
};

export default BoundingBoxDrawer;
