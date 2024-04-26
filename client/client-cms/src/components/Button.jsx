function Button({ ButtonType, onClick }) {
  return (
    <button
      type="submit"
      className={ButtonType === "Submit" ? "btn btn-primary mt-3" : "btn btn-secondary"}
      style={{ marginLeft: "220px" }}
      data-bs-dismiss="modal"
    >
      {ButtonType}
    </button>
  );
}
export default Button;
