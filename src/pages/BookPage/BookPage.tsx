import React, { useState, useEffect, memo } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { NavLink } from "react-router-dom";

import { Button } from "./Button";
import "./BookPage.scss";
import { db } from "./Firebase_config";

interface BookType {
  Author?: string;
  Name?: string;
  Genre?: string;
  Year?: number;
  id?: number;
  posterImage?: string;
  shadow?: string;
  BgImage?: string;
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "bookTitle", headerName: "Book Title", width: 150 },
  { field: "authorName", headerName: "Author Name", width: 170 },
  { field: "category", headerName: "Category", width: 150 },
  {
    field: "isbn",
    headerName: "ISBN",
    type: "number",
    width: 150,
  },
  {
    field: "Edit Book",
    headerName: "Edit Book",
    width: 150,
    renderCell: (props: any) => {
      return (
        <div>
          <NavLink className="editBtn" to={{ pathname: `/edit/${props.id}` }}>
            Edit
          </NavLink>
        </div>
      );
    },
  },
  {
    field: "Delete Book",
    headerName: "Delete Book",
    disableClickEventBubbling: true,
    width: 170,
    renderCell: (props: any) => {
      return (
        <div>
          <button className="deleteBtn" onClick={() => RemoveBook(props.id)}>
            Delete
          </button>
        </div>
      );
    },
  },
];

let RemoveBook = (id: number) => {
  let toString: string = id.toString();
  db.collection("bookTest")
    .doc(toString)
    .delete()
    .then(() => {
      console.log("Deleted successfully");
    });
};

const BooksPage = memo(() => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    let isMounted = true;
    let allData: BookType[] = [];
    db.collection("bookTest")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let data = doc.data();
          if (data) {
            allData.push(data);
          }
        });
        if (isMounted) {
          setBooks(allData);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [books]);

  return (
    <div className="mainContainer">
      <Button />
      <div className="booksTable">
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
});
export default BooksPage;
