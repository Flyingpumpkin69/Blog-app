import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className=" rounded-lg flex justify-center align-center gap-x-10 box-decoration-clone font-bold p-3 bg-gradient-to-r from-yellow-600 to-cyan-500 text-white px-2 shadow-md ...">
        <Link to="/">HOME</Link>
        <Link to="/create">CREATE</Link>
    </nav>
  )
}

export default Navbar