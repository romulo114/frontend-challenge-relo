import addAnnotationService from "../../services/annotationsService";
import useImageAnnotationStore from "../../stores/imageAnnotationStore";
import useSidebarStore from "../../stores/sidebarStore";
import Sleep from "../../utils/sleep";

const DiscardButton = () => {
  const { selectedImage, clearAnnotations, category, boundingBoxes } =
    useImageAnnotationStore((state) => state);
  const { discardFetchLoading, setDiscardFetchLoading, submitFetchLoading } =
    useSidebarStore((state) => state);
  return (
    <button
      type="button"
      disabled={(!category && boundingBoxes.length === 0) || submitFetchLoading}
      onClick={async (e) => {
        e.preventDefault();
        if (!selectedImage) {
          return;
        }

        setDiscardFetchLoading(true);

        await addAnnotationService(selectedImage.id, []);

        await Sleep(10);
        clearAnnotations();
        setDiscardFetchLoading(false);
        alert("Discard Success");
      }}
    >
      {discardFetchLoading ? "Loading ..." : "Discard"}
    </button>
  );
};

export default DiscardButton;
