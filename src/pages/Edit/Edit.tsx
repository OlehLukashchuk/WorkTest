import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
} from "react";
import { Link } from "react-router-dom";

import "./Edit.scss";
import { db } from "../BookPage/Firebase_config";
import { BookData } from "../../constants/book";

interface BookType {
  bookTitle?: string;
  authorName?: string;
  category?: string;
  isbn?: number | string;
}

interface EditBookProps {
  match: {
    url: {
      slice: (from: number, to: number) => string;
    };
    length: number;
  };
}

const From = 6;

const Edit = memo(({ match }: EditBookProps) => {
  const [book, setBook] = useState<BookType>({
    bookTitle : '',
    authorName : '',
    category : '',
    isbn: ''
  });


  const editBook = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>, keyName: string) => {
      setBook({ ...book, [keyName]: target.value });
    },
    [book]
  );

  useEffect(() => {
    const bookId = match.url.slice(From, match.length);
    let bookTemplate = {};
    db.collection("bookTest")
      .doc(bookId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          bookTemplate = { ...data };
          setBook(bookTemplate);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const saveChanges = useCallback(() => {
    console.log(book)
    const bookId = match.url.slice(From, match.length);

    db.collection("bookTest").doc(bookId).update({
      bookTitle: book.bookTitle,
      authorName: book.authorName,
      category: book.category,
      isbn: book.isbn,
    });
  }, [book]);

  return (
    <div className="editContainer">
      <form>
        <div className="editContainer_child">
          <span>Book Title</span>
          <input
            type="text"
            value={book.bookTitle}
            onChange={(event) => editBook(event, BookData.bookTitle)}
          ></input>
        </div>
        <div className="editContainer_child">
          <span>Author Name</span>
          <input
            type="text"
            value={book.authorName}
            onChange={(event) => editBook(event, BookData.authorName)}
          ></input>
        </div>
        <div className="editContainer_child">
          <span>Category</span>
          <input
            type="text"
            value={book.category}
            onChange={(event) => editBook(event, BookData.category)}
          ></input>
        </div>
        <div className="editContainer_child">
          <span>ISBN</span>
          <input
            type="text"
            value={book.isbn}
            onChange={(event) => editBook(event, BookData.isbn)}
          ></input>
        </div>
        <Link className="saveBtn" onClick={saveChanges} to="/">
          Save
        </Link>
        <Link className="returnBtn" to="/">
          Return
        </Link>
      </form>
    </div>
  );
});

export default Edit;
