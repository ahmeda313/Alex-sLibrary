import { useEffect, useState } from 'react';

export default function useFetch(genre: string) {
  const [bookArr, setBookArr] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGenres(genre, page).then((res) => {
      const parsedArr = parseArr(res.works);
      setBookArr((prevArr) => {
        return [...prevArr, ...parsedArr];
      });
      setLoading(false);
    });
  }, [page]);

  return {
    bookArr,
    setPage,
    loading,
  };
}

async function fetchGenres(genre: string, page: number) {
  const res = await fetch(
    `https://openlibrary.org/subjects/${genre}.json?limit=10&offset=${
      page * 10
    }`
  );
  const resData = await res.json();
  return resData;
}

function parseArr(arr: []) {
  return arr.map((i: any) => ({
    author: i.authors[0].name,
    cover_edition_key: i.cover_edition_key,
    cover_id: i.cover_id,
    ia: i.ia,
    title: i.title,
    uri: i.key,
    first_publish_year: i.first_publish_year,
  }));
}

// authors[0].name
// cover_edition_key
// cover_id
// ia
// title
// key
// first_publish_year
