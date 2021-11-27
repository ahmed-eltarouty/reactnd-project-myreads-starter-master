import React, { useEffect, useState } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './components/Header'
import Shelves from './components/Shelves'
import * as Api from './BooksAPI'
import Book from './components/Book'


const BooksApp = () => {

  useEffect(() => {
    Api.getAll()
    .then(data =>{
      setbooks(data)
      setmapOfIdToBooks(createMapOfBooks(data))
    } )
  }, [])

  const [Show, setShow] = useState(false)
  // let showSearchPage= false
  const [books, setbooks] = useState([])

  const [Search, setSearch] = useState("")

  const [SearchItems, setSearchItmes] = useState([])
  const [mapOfIdToBooks, setmapOfIdToBooks] = useState(new Map())
  const [MergedBooks, setMergedBooks] = useState([])

  // const mapOfIdToBooks = new Map();

  const moveToShelf = (book,newShelf) =>{
    const newOrder = books.map((Book) =>{
      if (Book.id === book.id){
        book.shelf = newShelf;
        return book;
      }
      return Book;
    })
    setbooks(newOrder);
    Api.update(book,newShelf)
    .then(data => console.log(data))
  }
  // console.log(books)

  useEffect(() => {

    if (Search){
      Api.search(Search).then(result => {
        (!result.error) ? setSearchItmes(result)  : alert(`no data for ${Search}`)
      })
    }
    return () =>{
      setSearchItmes([])
    }
  }, [Search])

  useEffect(() => {
    const combined = SearchItems.map(item =>{
      if (mapOfIdToBooks.has(item.id)){
        return mapOfIdToBooks.get(item.id);
      }else{
        return item
      }
    })
    setMergedBooks(combined)
  }, [SearchItems])

  const createMapOfBooks = (books) =>{
    const map = new Map()
    books.map(book => map.set(book.id , book))
    return map;
  }

  return (
    <div className="app">
      {Show ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => setShow(false)}>Close</button>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" value={Search} onChange={(e)=>setSearch(e.target.value)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {MergedBooks.map(item => (
                  <li key={item.id}>
                      <Book book={item} moveToShelf={moveToShelf} />
                  </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelves books={books} moveToShelf={moveToShelf}/>
          </div>
          <div className="open-search">
            <button onClick={() => setShow(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BooksApp
