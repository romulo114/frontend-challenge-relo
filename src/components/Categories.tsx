import { useEffect, useState } from "react";
import categoriesService, { Category } from "../services/categoriesService";
import useImageAnnotationStore from "../stores/imageAnnotationStore";
import addAnnotationService from "../services/annotationsService";
import Sleep from "../utils/sleep";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const setCategory = useImageAnnotationStore((state) => state.setCategory);

  const selectedCategory = useImageAnnotationStore((state) => state.category);
  const selectedImage = useImageAnnotationStore((state) => state.selectedImage);
  const setSelectedImage = useImageAnnotationStore(
    (state) => state.setSelectedImage
  );

  const queueImages = useImageAnnotationStore((state) => state.queueImages);
  const setQueueImages = useImageAnnotationStore(
    (state) => state.setQueueImages
  );

  const currentBoundingBoxes = useImageAnnotationStore(
    (state) => state.boundingBoxes
  );

  const fetchCategories = async () => {
    setIsLoading(true);

    const data = await categoriesService();

    if (data) {
      setCategories(data);
    }

    await Sleep(10);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Search options..." />
      </div>
      {isLoading && <p>on load...</p>}
      <ul className="options-list">
        {categories.map((val) => {
          return (
            <li
              key={val.id}
              className={`${
                selectedCategory?.id === val.id ? "highlight" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setCategory(val);
              }}
            >
              {val.name}
            </li>
          );
        })}
      </ul>
      <div className="buttons">
        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            if (!selectedImage) {
              return;
            }

            setIsLoadingSubmit(true);

            await addAnnotationService(selectedImage.id, []);

            await Sleep(10);
            setIsLoadingSubmit(false);
          }}
        >
          Discard
        </button>
        <button
          type="button"
          disabled={
            !selectedImage ||
            !selectedCategory ||
            currentBoundingBoxes.length === 0
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

            setIsLoadingSubmit(true);
            try {
              await addAnnotationService(selectedImage.id, [
                {
                  boundingBoxes: currentBoundingBoxes,
                  categoryId: selectedCategory.id,
                },
              ]);
              setSelectedImage(queueImages[0]);
              setQueueImages(queueImages.slice(1));
            } catch (err) {
              alert(err);
            }

            await Sleep(10);
            setIsLoadingSubmit(false);
          }}
        >
          {isLoadingSubmit ? "Loading ..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default Categories;
