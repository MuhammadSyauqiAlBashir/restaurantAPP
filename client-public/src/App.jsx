import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import data from "../../testcuisine.json"
import HomePage from './pages/HomePage'

function App() {
  console.log(data);
  const [count, setCount] = useState(0)
  const [singleData, setSingleData] = useState(null);
  function getDetail(item) {
    setSingleData(item);
  }

  return (
    <>
    <Navbar/>
    <HomePage data={data} getDetail={getDetail} />
    </>
  )
}

export default App
