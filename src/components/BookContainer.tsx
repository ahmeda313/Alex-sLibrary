import { useRef } from 'react';
import Book from './Book.tsx';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useFetch from '../Hooks/useFetch.tsx';
import Loading from './Loading.tsx';

export default function BookContainer({ title }: any) {
  const containerRef: any = useRef();
  const { bookArr, setPage, loading } = useFetch(title.toLowerCase());

  function scrollEnd() {
    const container = containerRef.current;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      setPage((prevPage) => prevPage + 1);
      console.log('Reached the end of horizontal scroll');
    }
  }
  if (bookArr.length===0 && loading) {
    return( 
    <div className="p-3 max-w-[60em] mx-auto relative rounded-lg group">
      <h1 className="ps-5 text-2xl font-bold">{title}</h1>
      <Loading/>
    </div>

    )
  }

  return (
    <div className="p-3 max-w-[60em] mx-auto relative rounded-lg group">
      {bookArr.length > 4 && (
        <button
          onClick={() =>
            containerRef.current.scrollBy({ left: -150, behaviour: 'smooth' })
          }
          className="hidden group-hover:block"
        >
          <FaArrowLeft
            size={40}
            className="hidden sm:block absolute left-0 lg:-left-5 top-20 z-10 h-3/4"
          />
        </button>
      )}

      <h1 className="ps-5 text-2xl font-bold">{title}</h1>

      {bookArr.length === 0 && (
        <h3 className="mt-16 text-center text-3xl font-thin">No books found</h3>
      )}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
        onScroll={scrollEnd}
      >
        {bookArr.map((i: any) => (
          <Book
            id={i.cover_id}
            key={i.uri}
            author={i.author}
            title={i.title}
            uri={i.uri}
          />
        ))}
        {loading && <Loading optionalClass="mt-24 p-10"/>}
      </div>

      {bookArr.length > 4 && (
        <button
          onClick={() =>
            containerRef.current.scrollBy({ left: 150, behaviour: 'smooth' })
          }
          className="hidden group-hover:block"
        >
          <FaArrowRight
            size={40}
            className="hidden sm:block absolute top-20 right-0 lg:-right-10 z-10 h-3/4"
          />
        </button>
      )}
    </div>
  );
}
