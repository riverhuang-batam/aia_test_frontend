import { useState, useEffect } from "react";
import SearchInput from './components/SearchInput';
import Pagination from './components/Pagination'
import View from './components/View';
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
      .then((datas) => {
        setDatas(datas.data)
        setMaxPageLimit(5)
        setMinPageLimit(0)
      })
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
    return setCurrentPage(pageNumber)
  };
  const paginationSetupProps = {currentPage, handleNextClick, handlePrevClick, handlePageClick, datas, minPageLimit, maxPageLimit}
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div className="text-center">
      <h2 className="mt-4">Imagx</h2>
      <SearchInput onSubmit={searchDatas} setTagInput={setTagInput} tagInput={tagInput} />
      <Pagination {...paginationSetupProps}/>
      <View datas={datas} currentPage={currentPage}/>
    </div>
  );
}

export default App;
