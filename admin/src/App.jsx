// import React from 'react'

import Navbar from "./conponents/Navbar"
import Sidebar from "./conponents/Sidebar"
import {Route, Routes} from 'react-router-dom'
import AddItem from "./pages/AddItem"
import ItemList from "./pages/ItemList"
import Orders from "./pages/Orders"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = 'http://localhost:4000';

  return (
    <div className="">
      <ToastContainer />
      <Navbar />

      <hr />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItem url={url} />} />
          <Route path="/list" element={<ItemList url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
