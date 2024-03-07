import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="col"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/detail/${item.id}`)
        }}
      >
        <div
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="800"
          className="card"
        >
          <img
            src={item.imgUrl}
            style={{ height: "12rem", objectFit: "cover" }}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(item.price)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
