import React, {
  memo,
  useState,
  useCallback,
  ChangeEvent,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./AddBook.scss";
import { RootState } from "../../index";
import { BookData } from "../../constants/book";
import BooksAction from "../../store/action/Books";

interface NewBookProps {
  history: {
    push: (path: string) => void;
  };
}

const newBook = memo(({ history }: NewBookProps) => {
  const [buttonState, setButtonState] = useState<boolean>(true);
  const state = useSelector(({ addBook }: RootState) => addBook.value);
  const dispatch = useDispatch();

  const [changedValue, setValue] = useState({
    bookTitle: state.bookTitle,
    authorName: state.authorName,
    category: state.category,
    isbn: state.isbn,
    id: Math.floor(Math.random() * 99),
  });

  const inputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>, keyName: string) => {
      setValue({ ...changedValue, [keyName]: event.target.value });
    },
    [changedValue]
  );

  const changeButtonState = useCallback(() => {
    if (
      changedValue.bookTitle &&
      changedValue.authorName &&
      changedValue.category &&
      changedValue.isbn !== ""
    ) {
      setButtonState(false);
    } else setButtonState(true);
  }, [
    changedValue.bookTitle,
    changedValue.authorName,
    changedValue.category,
    changedValue.isbn,
  ]);

  const addBook = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(BooksAction.setBooks(changedValue));
      history.push("/");
    },
    [changedValue]
  );

  useMemo(() => {
    changeButtonState();
  }, [changeButtonState]);

  return (
    <div className="addContainer">
      <form>
        <div className="addContainer_child">
          <span>Book Title</span>
          <input
            type="text"
            value={changedValue.bookTitle}
            onChange={(event) => inputValue(event, BookData.bookTitle)}
          ></input>
        </div>
        <div className="addContainer_child">
          <span>Author Name</span>
          <input
            type="text"
            value={changedValue.authorName}
            onChange={(event) => inputValue(event, BookData.authorName)}
          ></input>
        </div>
        <div className="addContainer_child">
          <span>Category</span>
          <input
            type="text"
            value={changedValue.category}
            onChange={(event) => inputValue(event, BookData.category)}
          ></input>
        </div>
        <div className="addContainer_child">
          <span>ISBN</span>
          <input
            type="text"
            value={changedValue.isbn}
            onChange={(event) => inputValue(event, BookData.isbn)}
          ></input>
        </div>
        (
        <button
          className={buttonState ? "disabledBtnSave" : "saveBtn"}
          onClick={addBook}
          disabled={buttonState}
        >
          Add
        </button>
        <Link className={"returnBtn"} to={{ pathname: "/" }}>
          Return
        </Link>
        )
      </form>
    </div>
  );
});

export default newBook;
