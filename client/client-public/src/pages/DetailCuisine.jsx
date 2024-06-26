import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../constant";

function DetailCuisine() {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const FetchData = async () => {
      try {
        const { data } = await axios(`${BASE_URL}/cuisine/${id}`);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);
  return (
    <div className="card mt-4 mb-3 position-absolute top-50 start-50 translate-middle" style={{width:600}}>
      <img src={data.imgUrl} className="card-img-top" style={{height:400}} />
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">
          {data.description}
        </p>
        <p className="card-text">
          <small className="text-body-secondary">{new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(data.price)}</small>
        </p>
      </div>
    </div>
  );
}

export default DetailCuisine;
