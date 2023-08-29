import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Notification from "./Pages/Notification/Notification";
import Menu from "./Pages/Menu/Menu";
import RootLayout from "./components/Layout/RootLayout";
import Calendar from "./Pages/Calendar/Calendar";
import SetAmount from "./components/SetAmount/SetAmount";
import Request from "./Pages/Allowance/Request/Request";
import RequestConfirm from "./Pages/Allowance/RequestConfirm/RequestConfirm";
import History from "./Pages/Allowance/History/History";
import Allowance from "./Pages/Allowance/Allowance";
import Fill from "./Pages/Allowance/Fill/Fill";
import RequestSet from "./Pages/Allowance/ReqeustSet/RequestSet";
import RequestEnd from "./Pages/Allowance/RequestEnd/RequestEnd";
import CommunityAccount from "./Pages/Community/Account/CommunityAccount2";
import ArticleDetail from "./Pages/Community/ArticleDetail";
import Loan from "./Pages/Loan/Loan";
import LoanHistory from "./Pages/Loan/LoanHistory";
import ApplyForm from "./Pages/Loan/ApplyForm ";
import Success from "./Pages/Allowance/Success/Success";
import Moim from "./Pages/Moim/Moim"
import ArticleForm from "./Pages/Community/ArticleForm";
import MoimForm from "./Pages/Moim/MoimForm";
import AllowanceParent from "./Pages/Allowance/Parent/AllowanceParent";
import Send from "./Pages/Allowance/Send/AllowanceSend";
import SendWho from "./Pages/Allowance/SendWho/SendWho";
import Periodic from "./Pages/Allowance/Periodic/Periodic";
// import Error from "./Pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignIn /> },
      { path: "join", element: <SignUp /> },
      { path: "notification", element: <Notification /> },
      { path: "calendar", element: <Calendar /> },
      { path: "menu", element: <Menu /> },
      { path: "input", element: <SetAmount /> },
      {
        path: "loan",
        children: [
          { index: true, element: <Loan /> },
          { path: "loanHistory/:loanId", element: <LoanHistory /> },

          { path: "applyForm", element: <ApplyForm /> },
        ],
      },
      {
        path: "allowance",
        children: [
          { index: true, element: <Allowance /> },
          {
            path: "request",
            children: [
              { index: true, element: <Request /> },
              { path: "set", element: <RequestSet /> },
              { path: "confirm", element: <RequestConfirm /> },
              { path: "end", element: <RequestEnd /> },
            ],
          },
          { path: "parent", element: <AllowanceParent /> },
          { path: "periodic", element: <Periodic /> },
          { path: "history", element: <History /> },
          {
            path: "send",
            children: [
              { index: true, element: <SendWho /> },
              { path: "set", element: <Send /> },
            ],
          },
          {
            path: "fill",
            children: [
              { index: true, element: <Fill /> },
              { path: "success", element: <Success /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "community", element: <CommunityAccount /> },
  { path: "article", element: <ArticleDetail /> },
  { path: "moim", element: <Moim /> },
  { path: "articleForm", element: <ArticleForm /> },
  { path: "moimForm", element:<MoimForm/>},
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
