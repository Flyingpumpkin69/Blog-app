
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './components/Home'
import CreateBlog from "./components/CreateBlog";
import Navbar from "./components/Navbar";


export default function App() {
  return (
  <>
  <BrowserRouter>
<Navbar/>
  <Routes>

<Route path="/" element={<Home/>} />

<Route path='/Create' element={<CreateBlog/>}/>

  </Routes>
  </BrowserRouter>
  </>
  )
}