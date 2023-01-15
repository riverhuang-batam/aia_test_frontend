import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [datas, setDatas] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(1);
  const pageNumberLimit = 5;
  const getDatas = () => {
    axios
      .get("http://localhost:4000/", { tag: "tags bro" })
      .then((datas) => setDatas(datas.data))
      .catch((err) => console.log(err));
  };
  const searchDatas = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    axios
      .post("http://localhost:4000/", { tag: tagInput })
      .then((datas) => setDatas(datas.data))
      .catch((err) => console.log(err));
  };
  const handleNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }

    setCurrentPage((prevNum) => prevNum + 1);
  };
  const handlePrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prevNum) => prevNum - 1);
  };
  const handlePageClick = (pageNumber) => {
    return setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div className="text-center">
      <h2 className="mt-4">Imagx</h2>
      <form onSubmit={searchDatas} className="form-group mb-4 mt-4 ">
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

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {datas.items && currentPage > 1 && (
            <li className="page-item" onClick={() => handlePrevClick()}>
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
          )}
          {datas.items && minPageLimit > 1 && (
            <li className="page-item disabled">
              <a className="page-link" href="#">
                ...
              </a>
            </li>
          )}

          {datas.items?.map((data, index) => {
            const pageNumber = index + 1;
            if (pageNumber <= maxPageLimit && pageNumber >= minPageLimit) {
              return (
                <li
                  className="page-item"
                  onClick={() => handlePageClick(pageNumber)}
                  key={pageNumber}
                >
                  <a
                    className={`page-link ${
                      currentPage == pageNumber && "active"
                    }`}
                  >
                    {pageNumber}
                  </a>
                </li>
              );
            }
          })}
          {datas.items && datas.items.length > maxPageLimit && (
            <li className="page-item disabled">
              <a className="page-link" href="#">
                ...
              </a>
            </li>
          )}
          {datas.items && currentPage < datas.items.length && (
            <li className="page-item" onClick={() => handleNextClick()}>
              <a className="page-link cursor-pointer" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          )}
        </ul>
      </nav>

      {datas.items && (
        <img
          src={datas.items[currentPage - 1]?.media.m}
          alt={datas.items[currentPage - 1]?.media.m}
          className="mt-4"
        />
      )}
      <h3>Title: {datas.items && datas.items[currentPage - 1]?.title}</h3>
      <p>Tag: {datas.items && datas.items[currentPage - 1]?.tags}</p>
    </div>
  );
}

export default App;
