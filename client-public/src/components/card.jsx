function Card({ item }) {
  return (
    <>
      <div
        className="col"
        style={{ cursor: "pointer" }}
        onClick={() => {
          getDetail(item);
        }}
      >
        <div
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="800"
          className="card"
          style={{ height: "35rem" }}
        >
          <img
            src={item.imgUrl}
            style={{ height: "12rem", objectFit: "cover" }}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <p>{item.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
