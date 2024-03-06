function Card({ item }) {
  return (
    <>
        <div
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="800"
          className="card"
          style={{ height: "35rem" }}
        >
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4 ">
                <img src={item.imgUrl} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.description}
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {item.price}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Card;
