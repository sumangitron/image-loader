import { useState } from "react";
import { useEffect } from "react";
import "./style.css";

const ImageLoader = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [disablebtn, setDisablebtn] = useState(false);

  useEffect(() => {
    (async function getData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${
            count === 0 ? 0 : count * 20
          }`
        );
        const data = await response.json();

        setApiData([...apiData, ...data.products]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [count]);

  useEffect(() => {
    if (apiData.length === 100) setDisablebtn(true);
  }, [apiData]);

  if (loading === true) {
    return <h3>Loading Products, Please wait...</h3>;
  }

  return (
    <div className="main-container">
      <div className="card-container">
        {apiData?.map((item, index) => {
          return (
            <div key={index} className="card">
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
      <button
        className={`${apiData.length === 100 ? "btndisable" : "btnenable"}`}
        disabled={disablebtn}
        onClick={() => setCount(count + 1)}
      >
        Load More Image
      </button>
    </div>
  );
};

export default ImageLoader;
