import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { AddBook } from "./Reducer";

const store = createStore(
  combineReducers({
    addBook: AddBook,
  }),
  applyMiddleware(thunk)
);

export default store;
