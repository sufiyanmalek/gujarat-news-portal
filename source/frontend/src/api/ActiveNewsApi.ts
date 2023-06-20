import axios from "axios";

export const getActiveNews = async () => {
  try {
    const news = await axios.get("http://localhost:3000/news/active");
    return news.data;
  } catch (error) {
    console.log(error);
  }
};
