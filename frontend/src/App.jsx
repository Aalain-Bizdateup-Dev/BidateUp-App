import { useState } from 'react'

import './App.css'
import Navbar from '../Components/Navbar/Navbar'
import Category_Screen from '../Components/Category_Screen/Category_Screen'
import Footer from '../Components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<Navbar/>
<Category_Screen title={"Please Select Category"} input = {"Search Category Name.."}/>
<Category_Screen title={"Please Select Employee Name"} input = {"Search Employee Name.."}/>
<Footer/>
</>
  )
}

export default App
