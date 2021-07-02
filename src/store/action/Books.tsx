import { db } from "../../pages/BookPage/Firebase_config";
import { AppDispatch } from "../../index";
import { NEW_BOOK } from "../../constants/store";

interface DataType {
  bookTitle: string;
  authorName: string;
  category: string;
  isbn: number;
  id: number;
}

export default class BooksAction {
  static setBooksAction = (data: DataType) => {
    return { type: NEW_BOOK, value: {} };
  };

  static setBooks = (data: DataType) => {
    return (dispatch: AppDispatch) => {
      db.collection("bookTest")
        .doc(`${data.id}`)
        .set(data)
        .then(() => {
          dispatch(BooksAction.setBooksAction(data));
        });
    };
  };
}
