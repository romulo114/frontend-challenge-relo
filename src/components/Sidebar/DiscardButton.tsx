import addAnnotationService from "../../services/annotationsService";
import useImageAnnotationStore from "../../stores/imageAnnotationStore";
import useSidebarStore from "../../stores/sidebarStore";
import Sleep from "../../utils/sleep";

const DiscardButton = () => {
  const { selectedImage, clearAnnotations } = useImageAnnotationStore(
    (state) => state
  );
  const { discardFetchLoading, setDiscardFetchLoading } = useSidebarStore(
    (state) => state
  );
  return (
    <button
      type="button"
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
      }}
    >
      {discardFetchLoading ? "Loading ..." : "Discard"}
    </button>
  );
};

export default DiscardButton;
