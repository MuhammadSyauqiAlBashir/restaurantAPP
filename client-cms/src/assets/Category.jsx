import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import axios from "axios";

function Category() {
  const [data, setData] = useState([]);
  async function FetchDataCategory() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}category`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      console.log(data);
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
      FetchDataCategory();
  }, []);
  return (
    <table className="table align-middle table-striped container">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Category;
