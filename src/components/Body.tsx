import { useContext } from 'react';
import BookContainer from './BookContainer.tsx';
import { BookMarkContext } from '../context.tsx';
import BookmarkContainer from './BookmarkContainer.tsx';

export default function Body() {
  const { bookMarksTabOpen } = useContext(BookMarkContext);

  return (
    <>
      {bookMarksTabOpen ? (
        <>
          <BookmarkContainer />
        </>
      ) : (
        <>
          <BookContainer title="Mystery" />
          <BookContainer title="Adventure" />
          {/* <BookContainer title="Thriller" /> */}
        </>
      )}
    </>
  );
}
