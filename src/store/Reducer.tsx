import { NEW_BOOK } from "../constants/store";

interface ActionType<T extends any> {
  type: string;
  value: T;
}

const AddBook = (
  state = {
    value: {
      bookTitle: "",
      authorName: "",
      category: "",
      isbn: "",
    },
  },
  action: ActionType<any>
) => {
  switch (action.type) {
    case NEW_BOOK:
      return { value: action.value };
    default:
      return state;
  }
};


export { AddBook };
