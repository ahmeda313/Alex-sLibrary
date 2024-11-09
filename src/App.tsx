import Header from './components/Header.tsx';
import SearchBar from './components/SearchBar.tsx';
import Body from './components/Body.tsx';
import BookMarkContextProvider from './context.tsx';


function App() {

  return (
    <BookMarkContextProvider>
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
      <Header />
      <SearchBar />
      <Body />
    </BookMarkContextProvider>
  );
}

export default App;
