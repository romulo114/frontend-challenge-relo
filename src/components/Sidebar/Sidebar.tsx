import SearchBar from "./SearchBar";
import useSidebarStore from "../../stores/sidebarStore";
import SubmitButton from "./SubmitButton";
import DiscardButton from "./DiscardButton";
import CategoryList from "./CategoryList";

const Sidebar = () => {
  const { categoriesFetchLoading } = useSidebarStore((state) => state);

  return (
    <div className="sidebar">
      <SearchBar />
      {categoriesFetchLoading && <p>on load...</p>}
      <CategoryList />
      <div className="buttons">
        <DiscardButton />
        <SubmitButton />
      </div>
    </div>
  );
};

export default Sidebar;
