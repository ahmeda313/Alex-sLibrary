import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { BookMarkContext } from '../context.tsx';
import { useContext } from 'react';

export default function Book({
  id,
  author,
  title,
  uri,
}: {
  id: string;
  author: string;
  title: string;
  uri: string;
}) {
  const { bookMarks, addToBookMarks, removeFromBookMarks } =
    useContext(BookMarkContext);
  let bookMarkFn: (obj: any) => void = addToBookMarks;
  let bookMarkFnArgs: any = { cover_id: id, author, title, uri };
  let Icon = FaRegBookmark;

  const isBookmarked = bookMarks.find((i: any) => i.cover_id === id);
  if (isBookmarked) {
    bookMarkFn = removeFromBookMarks;
    bookMarkFnArgs = id;
    Icon = FaBookmark;
  }
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 min-w-[10rem] max-w-[10rem] p-3 m-5 text-white hover:scale-105 duration-500 cursor-pointer select-none">
      <a href={`https://openlibrary.org${uri}`} target="_blank">
        <img
          src={`https://covers.openlibrary.org/b/id/${id}-M.jpg`}
          loading="eager"
          className="min-h-[12rem] mx-auto"
          alt="picture"
        />
        <div>
          <h3 className="pt-1 font-semibold text-md overflow-hidden">
            {title.length >40 ?title.substring(0,37)+"...":title}
          </h3>
          <p className="text-sm font-thin truncate">{author}</p>
        </div>
      </a>

      <div className="flex justify-end mt-1">
        <button
          onClick={() => {
            bookMarkFn(bookMarkFnArgs);
          }}
          className="absolute bottom-3 right-2"
        >
          <Icon size={25} className="hover:scale-110 duration-300 self-end" />
        </button>
      </div>
    </div>
  );
}
