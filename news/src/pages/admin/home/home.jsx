import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; 
import NewsCard from "../../../../components/newsCard";

export default function Home() {
  const [state, setState] = useState("loading");
  const [news, setNews] = useState([]); 

  useEffect(() => {
    if (state === "loading") {
      axios
        .get("http://localhost:3005/api/news") 
        .then((res) => {
          setNews(res.data); 
          setState("success");
          console.log(res.data)
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching news!");
          setState("error");
        });
    }
  }, [state]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3 ">
     
    
      {state === "loading" && <p>Loading news...</p>}
      {state === "error" && <p className="text-red-500">Failed to load news.</p>}
      {state === "success" &&
        news.map((article) => {
          return(
            // <h1 key={article.id}>{article.title}</h1>
            <NewsCard key={article.id} news={article} />
          )
        }
         
        )}
    </div>
  );
}
