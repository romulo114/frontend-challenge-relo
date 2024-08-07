import SearchBar from "./SearchBar";
import useSidebarStore from "../../stores/sidebarStore";
import SubmitButton from "./SubmitButton";
import DiscardButton from "./DiscardButton";

const Sidebar = () => {
  const { categoriesFetchLoading } = useSidebarStore((state) => state);

  return (
    <div className="sidebar">
      <SearchBar />
      {categoriesFetchLoading && <p>on load...</p>}

      <div className="buttons">
        <DiscardButton />
        <SubmitButton />
      </div>
    </div>
  );
};

export default Sidebar;
