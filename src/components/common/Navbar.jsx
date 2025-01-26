import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/dp.jpeg";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center font-semibold">
            <Link className="mr-5 hover:text-gray-900" to="loan-form">
              Wedding Loans
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="loan-form">
              Home Construction Loans
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="loan-form">
              Business Startup Loans
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="loan-form">
              Education Loans
            </Link>
          </nav>
          <div className="flex gap-1">
            <Link to="/auth/login">
              <button className="bg-blue-500 text-white inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-blue-800 rounded text-base mt-4 md:mt-0">
                Log In
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className=" bg-green-600 text-white inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-green-800 rounded text-base mt-4 md:mt-0">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
