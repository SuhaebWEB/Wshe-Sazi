import { useParams, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const SearchResultPaginate = () => {
  const { getdata } = useParams();
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage,setItemsPerPage] = useState(5);

  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [itemsPerPage, searchResults]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentResults = searchResults.slice(offset, offset + itemsPerPage);

  function handlingChange(e) {
    setItemsPerPage(Number(e.target.value)); // Make sure it's a number
    setCurrentPage(0); // Reset to first page
  }

  return (
    <div className="mt-28 px-4 text-white">
      <select id="page" onChange={handlingChange} className="bg-white text-black w-20 h-10 px-2 rounded-md focus:outline-none">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <h1 className="text-4xl mb-8 text-center">Results for "{getdata}" 🔎</h1>
      {currentResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
          {currentResults.map((item, index) => (
            <div
              key={index}
              dir="rtl"
              className="bg-blue-700 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 border border-blue-500"
            >
              <h2 className="text-xl font-semibold mb-2">
                {item.kurdish_word.kurdish_word || "No title"}
              </h2>
              <p className="text-gray-200">
                {item.kurdish_word.reason || "No description available."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl">No results found. 🙁</p>
      )}
      {searchResults.length > itemsPerPage && (
        <footer className="mt-8 flex justify-center">
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={Math.ceil(searchResults.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={"select-none flex space-x-2"}
            pageLinkClassName={"select-none w-full h-full flex items-center justify-center sm:px-3 py-1 px-2"}
            pageClassName={"select-none border rounded-md cursor-pointer hover:bg-blue-600 transition-all"}
            activeClassName={"select-none bg-blue-500 text-white"}
            previousClassName={"border rounded-md cursor-pointer hover:bg-blue-600 transition-all"}
            nextClassName={"select-none border rounded-md cursor-pointer hover:bg-blue-600 transition-all"}
            previousLinkClassName={"select-none w-full h-full flex items-center justify-center sm:px-3 px-2 py-1"}
            nextLinkClassName={"select-none w-full h-full flex items-center justify-center sm:px-3 px-2 py-1"}
          />
        </footer>
      )}
    </div>
  );
};

export default SearchResultPaginate;