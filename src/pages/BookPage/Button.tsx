import React, { memo } from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

export const Button = memo(() => {
  return (
    <div className="addBook">
      <Link to="/addBook">Add Book</Link>
    </div>
  );
});
