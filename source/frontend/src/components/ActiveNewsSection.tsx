import React, { useEffect, useState } from "react";
import NewsTab from "./NewsTab";
import { getActiveNews } from "../api/ActiveNewsApi";

type Props = {};

const ActiveNewsSection: React.FunctionComponent<Props> = (props: Props) => {
  // Active News State
  const [activeNews, setActiveNews] = useState([]);
  // Get Active News
  useEffect(() => {
    (async () => {
      const news = await getActiveNews();
      setActiveNews(news);
    })();
  }, []);
  return (
    <div className="grid grid-cols-3  p-5 gap-2 ">
      {activeNews.map((e: any, index: number) => {
        return <NewsTab key={index} news={e} />;
      })}
    </div>
  );
};

export default ActiveNewsSection;
