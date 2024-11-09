export function addToLocalStorage(book:any){
const res = localStorage.getItem("bookmarks")

const bookmarks = JSON.parse(res || "")

bookmarks.push(book)

localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}


export function removeFromLocalStorage(id:string){
const res = localStorage.getItem("bookmarks")

let bookmarks = JSON.parse(res || "")

bookmarks = bookmarks.filter((i:any) => i.cover_id !== id);

localStorage.setItem("bookmarks",JSON.stringify(bookmarks))    
}