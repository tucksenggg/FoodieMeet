import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from 'axios';
import { Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SearchBar from "./SearchBar";

function App() {

  // const [backendData, setBackendData] = React.useState("");

  // const apiCall = () => {
  //   axios.get('http://localhost:3000').then((data) => {
  //     setBackendData(data.data.message)
  //     console.log(backendData);
  //   })
  // }

  return (<div>
    <Header />
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
    <SearchBar />
    <Footer />
  </div>
  )
}

export default App;

// {/* <h1 className="text-5xl font-bold ">Hello</h1>
//     <p>{backendData}</p>
//     <button className="border-solid border-2 border-sky-500" onClick={apiCall}>Make API Call</button> */}
