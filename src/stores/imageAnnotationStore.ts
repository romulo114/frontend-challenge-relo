import { create } from "zustand";

type BoundingBox = {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
};

type ImageQueue = {
  id: number;
  url: string;
};

type Category = {
  id: number;
  name: string;
};

type ImageAnnotationState = {
  selectedImage: ImageQueue | null;
  category: Category | null;
  boundingBoxes: BoundingBox[];
  setSelectedImage: (image: ImageQueue) => void;
  setCategory: (category: Category) => void;
  addBoundingBox: (boundingBox: BoundingBox) => void;
  clearAnnotations: () => void;
};

const useImageAnnotationStore = create<ImageAnnotationState>((set) => ({
  selectedImage: null,
  category: null,
  boundingBoxes: [],
  setSelectedImage: (image) => set({ selectedImage: image }),
  setCategory: (category) => set({ category }),
  addBoundingBox: (boundingBox) =>
    set(() => ({
      //   boundingBoxes: [...state.boundingBoxes, boundingBox], uncomment when need to able multiple bounding box
      boundingBoxes: [boundingBox],
    })),
  clearAnnotations: () =>
    set({ boundingBoxes: [], selectedImage: null, category: null }),
}));

export default useImageAnnotationStore;
