import useImageAnnotationStore from "../../stores/imageAnnotationStore";
import categoriesService from "../../services/categoriesService";
import useSidebarStore from "../../stores/sidebarStore";
import Sleep from "../../utils/sleep";
import { useEffect } from "react";

const CategoryList = () => {
  const { setCategory, category } = useImageAnnotationStore((state) => state);

  const {
    setCategories,
    setCategoriesFetchLoading,
    categories,
    categoriesSearchQuery,
  } = useSidebarStore((state) => state);

  const fetchCategories = async () => {
    setCategoriesFetchLoading(true);

    const data = await categoriesService();

    if (data) {
      setCategories(data);
    }

    await Sleep(10);

    setCategoriesFetchLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="options-list">
      {categories.map((val) => {
        const isHide =
          categoriesSearchQuery.length > 0 &&
          !val.name.toLowerCase().includes(categoriesSearchQuery.toLowerCase());
        const isSelected = category?.id === val.id;
        return (
          <li
            key={val.id}
            className={`${isSelected ? "highlight" : ""} ${
              isHide ? "hidden" : ""
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
  );
};

export default CategoryList;
