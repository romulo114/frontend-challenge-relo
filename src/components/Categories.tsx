import { useEffect, useState } from "react";
import categoriesService, { Category } from "../services/categoriesService";
import useImageAnnotationStore from "../stores/imageAnnotationStore";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const setCategory = useImageAnnotationStore((state) => state.setCategory);

  const selectedCategory = useImageAnnotationStore((state) => state.category);

  const fetchCategories = async () => {
    setIsLoading(true);

    const data = await categoriesService();

    if (data) {
      setCategories(data);
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 10);
    });

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
        <button>Discard</button>
        <button>Confirm</button>
      </div>
    </div>
  );
};

export default Categories;
