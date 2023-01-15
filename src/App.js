import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [datas, setDatas] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [currentPages, setCurrentPages] = useState(1);
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
    setCurrentPages(1)
    axios
      .post("http://localhost:4000/", { tag: tagInput })
      .then((datas) => setDatas(datas.data))
      .catch((err) => console.log(err));
  };
  const handleNextClick = () => {
    if (currentPages + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }

    setCurrentPages((prevNum) => prevNum + 1);
  };
  const handlePrevClick = () => {
    if ((currentPages - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPages((prevNum) => prevNum - 1);
  };
  const handlePageClick = (pageNumber) => {
    return setCurrentPages(pageNumber);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {datas.items && currentPages > 1 && (
            <li class="page-item" onClick={() => handlePrevClick()}>
              <a class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
          )}
          {datas.items && minPageLimit > 1 && (
            <li class="page-item disabled">
              <a class="page-link" href="#">
                ...
              </a>
            </li>
          )}

          {datas.items?.map((data, index) => {
            const pageNumber = index + 1;
            console.log(
              data,
              "====",
              index,
              currentPages,
              maxPageLimit,
              pageNumber
            );
            if (pageNumber <= maxPageLimit && pageNumber >= minPageLimit) {
              return (
                <li
                  class="page-item"
                  onClick={() => handlePageClick(pageNumber)}
                >
                  <a
                    class={`page-link ${
                      currentPages == pageNumber && "active"
                    }`}
                    href="#"
                  >
                    {pageNumber}
                  </a>
                </li>
              );
            }
          })}
          {datas.items && datas.items.length > maxPageLimit && (
            <li class="page-item disabled">
              <a class="page-link" href="#">
                ...
              </a>
            </li>
          )}
          {datas.items && currentPages < datas.items.length && (
            <li class="page-item" onClick={() => handleNextClick()}>
              <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          )}
        </ul>
      </nav>

      <form onSubmit={searchDatas}>
        <input
          id="search"
          type="text"
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {datas.items && (
        <img
          src={datas.items[currentPages - 1]?.media.m}
          alt={datas.items[currentPages - 1]?.media.m}
        />
      )}

      <h3>
        {datas.items && datas.items[currentPages - 1]?.title}
        {console.log(datas)}
      </h3>
      {datas.items?.map((item) => {
        return (
          <div>
            <img src={item.media.m} alt={item.media.m} />
            <h1>{item.title}</h1>
            <p>{item.tags}</p>
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
