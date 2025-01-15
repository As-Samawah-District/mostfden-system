import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Auth/Login";
import { Nav } from "./components/Nav/Nav";
import { SideBar } from "./components/SideBar/SideBar";
import { Lists } from "./components/Lists/Lists";
import { AddForm } from "./components/addForm/AddForm";
import Class from "./components/classes/Class";
import { Logs } from "./components/logs/Logs";
import { Logo } from "./components/Logo/Logo";
import { Profile } from "./components/profile/Profile";
import { Modal } from "./components/modal/Modal";
import { Users } from "./components/users/Users";
import { EditForm } from "./components/editForm/EditForm";
import { Print } from "./components/printForm/Print";
import { ShowBook } from "./components/showBook/ShowBook";
import {
  Routes,
  BrowserRouter,
  Route,
  useBeforeUnload,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Database } from "./components/Downloads/Database";
import NewBook from "./components/publicBook/NewBook";
import National from "./components/nationalBook/National";
import Archive from "./components/archive/Archive";
import ShowArch from "./components/archive/ShowArch";
import Estifada from "./components/publicBook/Estifada";
import Tashier from "./components/publicBook/Tashier";
import { List2 } from "./components/Lists/List2";
import { ArchiveData } from "./components/Downloads/ArchiveData";
import { PendingPage } from "./components/PendingPage/PendingPage";
import {SearchBeforeAddNew} from "./components/SearchBeforeAddNew/SearchBeforeAddNew";

export const Context = createContext(null);

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forms" element={<Lists />} />
        <Route exact path="/temporaryforms" element={<List2 />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/form/search" element={<SearchBeforeAddNew />} />
        <Route exact path="/form/add" element={<AddForm />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/classes" element={<Class />} />
        <Route exact path="/logo" element={<Logo />} />
        <Route exact path="/form/edit/:id" element={<EditForm />} />
        <Route exact path="/logs" element={<Logs />} />
        <Route exact path="/form/print/:id" element={<Print />} />
        <Route exact path="/form/show/:id" element={<ShowBook />} />
        <Route exact path="/smv-database" element={<Database />} />
        <Route exact path="/smv-archive" element={<ArchiveData />} />
        <Route exact path="/archive" element={<Archive />} />
        <Route exact path="/archive/:id" element={<ShowArch />} />
        <Route exact path="/NewBook" element={<NewBook />} />
        <Route exact path="/National" element={<National />} />
        <Route exact path="/estifada" element={<Estifada />} />
        <Route exact path="/tashier" element={<Tashier />} />
        <Route exact path="/pendingPage" element={<PendingPage />} />
      </Routes>
    </>
  );
}

export default App;
