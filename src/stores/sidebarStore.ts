import { create } from "zustand";
import { Category } from "../services/categoriesService";

type SidebarState = {
  categories: Category[];
  categoriesSearchQuery: string;
  categoriesFetchLoading: boolean;
  submitFetchLoading: boolean;
  discardFetchLoading: boolean;
  setCategories: (categories: Category[]) => void;
  setCategoriesSearchQuery: (searchQuery: string) => void;
  setCategoriesFetchLoading: (status: boolean) => void;
  setSubmitFetchLoading: (status: boolean) => void;
  setDiscardFetchLoading: (status: boolean) => void;
};

const useSidebarStore = create<SidebarState>((set) => ({
  categoriesSearchQuery: "",
  categories: [],
  categoriesFetchLoading: false,
  submitFetchLoading: false,
  discardFetchLoading: false,
  setCategories: (categories) => set({ categories: categories }),
  setCategoriesSearchQuery: (searchQuery) =>
    set({ categoriesSearchQuery: searchQuery }),
  setCategoriesFetchLoading: (status) =>
    set({ categoriesFetchLoading: status }),
  setSubmitFetchLoading: (status) => set({ submitFetchLoading: status }),
  setDiscardFetchLoading: (status) => set({ discardFetchLoading: status }),
}));

export default useSidebarStore;
