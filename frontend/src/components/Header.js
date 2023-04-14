// NavbarComponent.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
const navigate = useNavigate();

  const handleShowLogin = () =>{
    navigate("/login");
  }
  
  return (
    <>
    <div >
      <Navbar className="navbarCSS" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Expense Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-primary" onClick={handleShowLogin} className="ml-2">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      </div>
    </>
  );
};

export default Header;
