import { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";
function SearchInput(props) {
  
  const {onSubmit, tagInput, setTagInput} = props
  console.log(onSubmit, '===')
  return (
    <div className="text-center">
      <h2 className="mt-4">Imagx</h2>
      <form onSubmit={onSubmit} className="form-group mb-4 mt-4 ">
        <div className="input-group d-flex flex-row justify-content-center">
          <div className="form-outline ">
            <input
              id="search"
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              placeholder="search"
              className="form-control"
            />
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
