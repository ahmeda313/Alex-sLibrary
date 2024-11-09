import { FaBookmark, FaHome } from 'react-icons/fa';
import { useContext } from 'react';
import { BookMarkContext } from '../context.tsx';

export default function Nav() {
  const { bookMarksTabOpen, showBookMarkTab, hideBookMarkTab } =
    useContext(BookMarkContext);
  return (
    <div className="mt-3 relative flex justify-between max-w-40 mx-auto mb-1">
      <button
        className={
          !bookMarksTabOpen
            ? 'bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-2 transition-border duration-500'
            : ''
        }
        onClick={hideBookMarkTab}
      >
        <FaHome size={35} />
      </button>
      <button
        className={
          bookMarksTabOpen
            ? 'bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-2 px-2.5 transition-border duration-500'
            : ''
        }
        onClick={showBookMarkTab}
      >
        <FaBookmark size={30} />
      </button>
    </div>
  );
}
