import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import data from "../../testcuisine.json"
import PubCuisine from './pages/PubCuisine'
import axios from 'axios'

function App() {
  const [state, setState] = useState([])
  async function FetchData(){
    try {
      const {data} = await axios({
        method: "get",
        url : "https://bismillah.watersnj.com/pub/cuisine"
      })
      setState(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {FetchData()}, [])
  return (
    <>
    <PubCuisine state={state}/>
    </>
  )
}

export default App
