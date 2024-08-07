import axios from "axios";

export type Category = {
  id: number;
  name: string;
};
const categoriesService = async () => {
  try {
    const res = await axios.get(
      "https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories"
    );

    return res.data as Category[];
  } catch (err) {
    console.log(err);
    alert("Something wrong happen");
  }
};

export default categoriesService;
