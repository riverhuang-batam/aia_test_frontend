function SearchInput(props) {
  
  const {currentPage, handleNextClick, handlePrevClick, handlePageClick, datas, minPageLimit, maxPageLimit} = props
  
  return (
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
              <a className="page-link">
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
                      currentPage === pageNumber && "active"
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
              <a className="page-link">
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
  );
}

export default SearchInput;
