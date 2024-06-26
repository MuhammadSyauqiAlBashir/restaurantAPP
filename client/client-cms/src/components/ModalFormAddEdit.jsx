import Button from "./Button";

function ModalFormAddEdit({
  handleChange,
  handleSubmit,
  category,
  edit,
  input,
}) {
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: "600px" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {edit === 0 ? "Add Cuisine" : "Edit Cuisine"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-3 col-form-label"
                >
                  Cuisine's Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    className="form-control"
                    id="inputEmail3"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-3 col-form-label"
                >
                  Description
                </label>
                <div className="col-sm-9">
                  <textarea
                    className="form-control"
                    id="inputPassword3"
                    value={input.description}
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-3 col-form-label"
                >
                  Price
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    value={input.price}
                    id="inputPassword3"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-3 col-form-label"
                >
                  Image Url
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    value={input.imgUrl}
                    name="imgUrl"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  name="categoryId"
                  id="floatingSelect"
                  value={input.categoryId}
                  onChange={handleChange}
                  aria-label="Floating label select example"
                >
                  <option value="">Open this select Category</option>
                  {category && category.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingSelect">Select Cuisine Category</label>
              </div>
              <Button ButtonType={"Submit"} />
            </form>
          </div>
          <div className="modal-footer">
            <Button ButtonType={"Close"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalFormAddEdit;
