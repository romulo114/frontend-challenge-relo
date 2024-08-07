import useSidebarStore from "../../stores/sidebarStore";
import Sleep from "../../utils/sleep";
import useImageAnnotationStore from "../../stores/imageAnnotationStore";
import addAnnotationService from "../../services/annotationsService";

const SubmitButton = () => {
  const { submitFetchLoading, setSubmitFetchLoading, discardFetchLoading } =
    useSidebarStore((state) => state);

  const {
    selectedImage,
    queueImages,
    category: selectedCategory,
    boundingBoxes: currentBoundingBoxes,
    setSelectedImage,
    clearAnnotations,
    setQueueImages,
  } = useImageAnnotationStore((state) => state);
  return (
    <button
      type="button"
      disabled={
        !selectedImage ||
        !selectedCategory ||
        currentBoundingBoxes.length === 0 ||
        submitFetchLoading ||
        discardFetchLoading
      }
      onClick={async (e) => {
        e.preventDefault();
        if (
          !selectedImage ||
          !selectedCategory ||
          currentBoundingBoxes.length === 0
        ) {
          return;
        }

        setSubmitFetchLoading(true);
        try {
          await addAnnotationService(selectedImage.id, [
            {
              boundingBoxes: currentBoundingBoxes.map((val) => {
                return {
                  topLeftX: Math.min(val.startX, val.endX),
                  topLeftY: Math.min(val.startY, val.endY),
                  width: Math.abs(val.endX - val.startX),
                  height: Math.abs(val.endY - val.startY),
                };
              }),
              categoryId: selectedCategory.id,
            },
          ]);
          setSelectedImage(queueImages[0]);
          clearAnnotations();
          setQueueImages(queueImages.slice(1));
        } catch (err) {
          alert(err);
        }

        await Sleep(10);
        setSubmitFetchLoading(false);
        alert("Submit Success");
      }}
    >
      {submitFetchLoading ? "Loading ..." : "Confirm"}
    </button>
  );
};

export default SubmitButton;
