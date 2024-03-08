function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner" style={{height: "500px"}}>
        <div className="carousel-item active">
          <img src="https://e0.pxfuel.com/wallpapers/710/662/desktop-wallpaper-restaurant-restaurant-for-your-mobile-tablet-explore-widescreen-high-resolution-widescreen.jpg" className="d-block w-100" alt="" />
        </div>
        <div className="carousel-item">
          <img src="https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?cs=srgb&dl=pexels-yente-van-eynde-2403392.jpg&fm=jpg" className="d-block w-100" alt="" />
        </div>
        <div className="carousel-item">
          <img src="https://wallpaperbat.com/img/729660-restaurant-food-architecture-interior-design-room-wallpaper-hd-desktop-and-mobile-background.jpg" className="d-block w-100" alt="" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
