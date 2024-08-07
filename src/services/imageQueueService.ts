import axios from "axios";

export type ImageQueue = {
  id: number;
  url: string;
};
const imageQueueService = async () => {
  try {
    const res = await axios.get(
      "https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images"
    );

    return res.data as ImageQueue[];
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

export default imageQueueService;
