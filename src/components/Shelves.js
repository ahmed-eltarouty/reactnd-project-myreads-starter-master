import React from 'react';
import Shelf from './Shelf';


const Shelves = (props) => {
    const currentlyReading = props.books.filter((book) => book.shelf === 'currentlyReading');
    const wantToRead = props.books.filter((book) => book.shelf === 'wantToRead');
    const read = props.books.filter((book) => book.shelf === 'read');
    return(
        <div>
            <Shelf title="currently Reading" Books={currentlyReading} moveToShelf={props.moveToShelf}/>
            <Shelf title="Want To Read" Books={wantToRead} moveToShelf={props.moveToShelf}/>
            <Shelf title="Read" Books={read} moveToShelf={props.moveToShelf}/>
        </div>
    )
}

export default Shelves