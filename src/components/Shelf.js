import React from 'react';
import Book from './Book';


const Shelf = (props) => {

    return(
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.Books.map(book => (
                            <li key={book.id}>
                                <Book book={book} moveToShelf={props.moveToShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )

}

export default Shelf