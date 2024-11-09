import { useRef, useContext } from 'react';
import Book from './Book.tsx';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BookMarkContext } from '../context.tsx';

export default function BookmarkContainer() {
  const containerRef: any = useRef();
  const { bookMarks } = useContext(BookMarkContext);

  return (
    <div className="p-3 max-w-[60em] mx-auto relative rounded-lg group">
      {bookMarks.length > 4 && (
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

      <h1 className="ps-5 text-2xl font-bold">Bookmarks</h1>

      {bookMarks.length === 0 && (
        <h3 className="mt-16 text-center text-3xl font-thin">No Bookmarks</h3>
      )}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {bookMarks.map((i: any) => (
          <Book
            id={i.cover_id}
            key={i.uri}
            author={i.author}
            title={i.title}
            uri={i.uri}
          />
        ))}
      </div>

      {bookMarks.length > 4 && (
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
