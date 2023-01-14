import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [datas, setDatas] = useState([]);
  const getDatas = () => {
    axios
      .get("http://localhost:4000/")
      .then((datas) => setDatas(datas.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div>
      {console.log(datas.items, "")}
      <input />
      {datas.items.map((item) => (
        <div>
          <img src={item.media.m} alt={item.media.m} />
          <h1>{item.title}</h1>
          <p>{item.tags}</p>
          <p>{item.description}</p>
        </div>
      ))}
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
