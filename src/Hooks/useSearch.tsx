import { useEffect, useState } from 'react';

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchRes, setSearchRes] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      return;
    }
    setLoading(true);
    search(searchTerm, page).then((result) => {
      console.log(result);
      const parsedRes = parseArr(result);
      if (page === 0) {
        setSearchRes([...parsedRes]);
      } else {
        setSearchRes((prevRes) => [...prevRes, ...parsedRes]);
      }
      setLoading(false);
    });
  }, [searchTerm, page]);

  return {
    searchTerm,
    setSearchTerm,
    setPage,
    loading,
    searchRes,
  };
}

async function search(term: string, page: number) {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${term.split(' ').join("+")}&limit=10&offset=${page * 10}`
  );
  const resData = await res.json();
  return resData;
}

function parseArr(obj: any) {
  const arr = obj.docs;

  const parsedArr =  arr.map((i: any) => ({
    author: i.author_name[0],
    cover_id: i.cover_i,
    title: i.title,
    uri: i.key,
  }));

  return parsedArr.filter((i:any)=>i.cover_id!==undefined)
}

// author_name[0],
// cover_edition_key
// cover_i
// key
// title
// first_publish_year
