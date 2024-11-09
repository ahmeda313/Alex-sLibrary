import { useRef, useContext } from 'react';
import Nav from './Nav.tsx';
import useSearch from '../useSearch.tsx';
import SearchResults from './SearchResults.tsx';
import { BookMarkContext } from '../context.tsx';

export default function SearchBar() {
  const inputRef: any = useRef();
  const { searchTerm, setSearchTerm, loading, searchRes, setPage } =
    useSearch();
  const { bookMarksTabOpen } = useContext(BookMarkContext);

  function searchFn(e: any) {
    e.preventDefault();
    console.log(inputRef.current.value);
    setSearchTerm(inputRef.current.value);
    setPage(0);
  }
  return (
    <>
      <form className="max-w-md mx-auto mt-5 p-3" onSubmit={searchFn}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 text-white placeholder-white/90"
            placeholder="Harry potter, lord of rings..."
            required
            ref={inputRef}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-white hover:bg-white/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2"
          >
            <svg
              className="w-4 h-4 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>
      <Nav />
      {!bookMarksTabOpen && searchTerm !== '' && (
        <SearchResults
          searchTerm={searchTerm}
          searchResArr={searchRes}
          setPage={setPage}
          loading={loading}
        />
      )}
    </>
  );
}
