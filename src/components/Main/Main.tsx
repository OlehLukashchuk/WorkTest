import React, { Suspense, memo, lazy } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import "./Main.scss";

const BookPage = lazy(() => import("../../pages/BookPage/BookPage"));
const AddBook = lazy(() => import("../../pages/AddBook/AddBooks"));
const Edit = lazy(() => import("../../pages/Edit/Edit"));

const toPage = (
  props: RouteComponentProps<{}, any, any>,
  Page: React.LazyExoticComponent<
    React.MemoExoticComponent<(props: any) => JSX.Element>
  >
) => {
  return (
    <Suspense fallback={<div></div>}>
      <Page {...props} />
    </Suspense>
  );
};

export const Main = memo(() => {
  return (
    <main>
      <Switch>
        <Route exact path="/" render={(props) => toPage(props, BookPage)} />
        <Route exact path="/edit/:id" render={(props) => toPage(props, Edit)} />
        <Route exact path="/addBook" render={(props) => toPage(props, AddBook)} />
      </Switch>
    </main>
  );
});
