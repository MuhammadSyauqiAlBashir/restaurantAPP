export default function SearchBar({handleInputChange}){
  return (
    <div className="input-group mb-3" style={{width:500}}>
      <span className="input-group-text">Find by Food Name :</span>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInputGroup1"
          placeholder="Keyword"
          name="search"
          onChange={handleInputChange}
        />
        <label htmlFor="floatingInputGroup1">Keyword</label>
      </div>
    </div>
  );
}
