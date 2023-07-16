import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../Form/SearchBar";
function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categories,setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/category/get-category"
      );
      if (data.success) setCategories(data.data);
    } catch (e) {
      
      console.log(e);
    }
  }
  function handleLogout() {
    setAuth({
      ...auth,
      user: "",
      token: null,
    });
    localStorage.removeItem("auth");
    navigate('/login');
  }
  
  return (
    <Navbar expand="lg" className="bg-dark-subtle py-2 shadow">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} style={{ color: "black" }}>
            SAHARA
          </Link>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
        <SearchBar/>
            <Nav.Link as={Link} to={"/"} style={{ color: "black" }}>
              HOME
            </Nav.Link>
            
            <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    CATEGORIES
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {categories?.map((category)=>{
                      return <Nav.Link as={Link} key={category._id} to = {`/category/${category.slug}`} >
                        {category.name}
                        </Nav.Link>   
                    })}
                      
                  </div>
                </li>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to={"/signup"} style={{ color: "black" }}>
                  REGISTER
                </Nav.Link>
                <Nav.Link as={Link} to={"/login"} style={{ color: "black" }}>
                  LOGIN
                </Nav.Link>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {auth?.user?.name.toUpperCase()}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Nav.Link
                      as={Link}
                      
                      to={`/dashboard/${auth?.user?.isAdmin === false ? "user" : "admin"}`}
                      className="dropdown-item bg-dark-subtle"
                      style={{ color: "black" }}
                      
                    >
                      DASHBOARD
                    </Nav.Link>
                    <div className="dropdown-divider" />
                    <Nav.Link
                      className="dropdown-item bg-danger-subtle"
                      style={{ color: "black" }}
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </Nav.Link>
                  </div>
                </li>
              </>
            )}
             <Nav.Link as={Link} to={"/cart"} style={{ color: "black" }}>
                  CART
                </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
