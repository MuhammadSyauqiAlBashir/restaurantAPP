import Button from "./Button";

function PatchDataImage({ HandleImageChange, HandlePatchImage }) {
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: "600px" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Change Cuisine's Image
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={HandlePatchImage}>
              <label htmlFor="formFileLg" className="form-label">
                Select Cuisine Image
              </label>
              <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
                name="photo"
                onChange={HandleImageChange}
              />
              <Button ButtonType={"submit"}/>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PatchDataImage;
