import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

function Header() {

  const[auth,setAuth] = useAuth();

  function handleLogout(){
    setAuth({
      ...auth,
      user:'',
      token:null,
    })
    localStorage.removeItem('auth');
  }
  return (
    <Navbar expand="lg" className="bg-dark-subtle py-2 shadow">
      <Container>
        <Navbar.Brand>
          <Link to={'/'} style={{color:"black"}}>SAHARA</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={'/'} style={{color:"black"}}>
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to={'/products'} style={{color:"black"}}>
              PRODUCTS
            </Nav.Link>
            {!auth.user? <>
              <Nav.Link as={Link} to={'/signup'} style={{color:"black"}}>
              REGISTER
            </Nav.Link>
            <Nav.Link as={Link} to={'/login'} style={{color:"black"}}>
              LOGIN
            </Nav.Link>
            </>:<>
            <Nav.Link  style={{color:"black"}} onClick={handleLogout}>
              LOGOUT
            </Nav.Link>
            <Nav.Link  style={{color:"black"}}>
              CART
            </Nav.Link>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
