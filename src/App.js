import './App.css';
import axios from './axios';
import React, { useEffect, useState } from "react"

function App() {
  useEffect(()=>{
    axios.get("/")
    .then((res)=>{
       setData(res.data)
    }).catch((e)=>{
      console.log(e)
    })
  })
  const [data, setData] =  useState()
  return (
    <div className="App">
    THe data value is  {data}
    </div>
  );
}

export default App;
