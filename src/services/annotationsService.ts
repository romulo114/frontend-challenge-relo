import axios from "axios";

export type AnnotationBody = {
  imageId: number;
  annotations: {
    categoryId: number;
    boundingBoxes: {
      topLeftX: number;
      topLeftY: number;
      width: number;
      height: number;
    }[];
  }[];
};

const addAnnotationService = async (
  imageId: AnnotationBody["imageId"],
  annotations: AnnotationBody["annotations"]
) => {
  try {
    const res = await axios.post(
      "https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations",
      {
        imageId,
        annotations,
      }
    );

    return res.data as { message: "string" };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default addAnnotationService;
