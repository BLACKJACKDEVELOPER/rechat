import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import "@arco-design/web-react/dist/css/arco.css";
import './index.css';
// SPA router
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/index'
// page
import Layout from "./Layout" // Main
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import CreateRoom from './pages/createRoom.jsx'
import Myrooms from './pages/myrooms.jsx'
import Account from './pages/account.jsx'
import Messages from './pages/messages.jsx'
import Room from './pages/room.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<App />} />
          <Route path="createRoom" element={<CreateRoom />} />
          <Route path="myrooms" element={<Myrooms />} />
          <Route path="account" element={<Account />} />
          <Route path="messages" element={<Messages />} />
          <Route path="room" element={<Room />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
