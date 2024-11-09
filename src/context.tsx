import { createContext, useState } from 'react';
type Book = {
  author: string;
  title: string;
  id: string;
};
type Bookmark = {
  bookMarks: Book[];
  bookMarksTabOpen: boolean;
  showBookMarkTab: () => void;
  hideBookMarkTab: () => void;
  addToBookMarks: (book: Book) => void;
  removeFromBookMarks: (id: string) => void;
};

export const BookMarkContext = createContext<Bookmark>({
  bookMarks: [],
  bookMarksTabOpen: false,
  showBookMarkTab: () => {},
  hideBookMarkTab: () => {},
  addToBookMarks: () => {},
  removeFromBookMarks: () => {},
});

export default function BookMarkContextProvider({ children }:any) {
  const books: Book[] = [];
  const [bookMarks, setBookMarks] = useState(books);
  const [bookMarksTabOpen, setBookMarksTabOpen] = useState(false);

  function addToBookMarks(book: Book) {
    console.log(book, 'added to bookmark');
    setBookMarks((prevBooks) => {
      return [...prevBooks, book];
    });
  }
  function removeFromBookMarks(id: string) {
    console.log(id, 'removed to bookmark');
    setBookMarks((prevBooks) => {
      return prevBooks.filter((i) => i.id !== id);
    });
  }
  function showBookMarkTab() {
    setBookMarksTabOpen(true);
  }
  function hideBookMarkTab() {
    setBookMarksTabOpen(false);
  }

  const ctxValue = {
    bookMarks: bookMarks,
    bookMarksTabOpen: bookMarksTabOpen,
    showBookMarkTab: showBookMarkTab,
    hideBookMarkTab: hideBookMarkTab,
    addToBookMarks: addToBookMarks,
    removeFromBookMarks: removeFromBookMarks,
  };
  return (
    <BookMarkContext.Provider value={ctxValue}>
      {children}
    </BookMarkContext.Provider>
  );
}
