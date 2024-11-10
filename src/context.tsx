import { createContext, useEffect, useState } from 'react';
import {addToLocalStorage,removeFromLocalStorage} from "./utils/localstorage.ts"
type Book = {
  author: string;
  title: string;
  cover_id: string;
  uri:string
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
  removeFromBookMarks: () => {}
});

export default function BookMarkContextProvider({ children }:any) {
  const books: Book[] = [];
  const [bookMarks, setBookMarks] = useState(books);
  const [bookMarksTabOpen, setBookMarksTabOpen] = useState(false);

  useEffect(()=>{
    if(!localStorage.getItem("bookmarks")){
      localStorage.setItem("bookmarks",JSON.stringify([]))
    }else{
      setBookMarks(JSON.parse(localStorage.getItem("bookmarks")|| "[]"))
    }

  },[])

  function addToBookMarks(book:Book) {
    addToLocalStorage(book)
    console.log(book)
    setBookMarks((prevBooks) => {
      return [...prevBooks, book];
    });
  }
  function removeFromBookMarks(id: string) {
    removeFromLocalStorage(id)
    setBookMarks((prevBooks) => {
      return prevBooks.filter((i) => i.cover_id !== id);
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
