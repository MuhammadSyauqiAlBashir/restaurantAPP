import Card from "../components/card";

function HomePage({ data, getDetail }) {
  return (
    <>
      <div className="container my-5">
        <h2 className="text-center my-5">Database Group</h2>
        <div className="row row-cols-4 g-3">
          {data.map((item) => (
            <Card item={item} key={item.id} getDetail={getDetail} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
