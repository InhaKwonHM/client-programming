import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'

const Menubar = () => {
  return (
    
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
    <Container fluid>
        <Navbar.Brand href="#">REACT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav 
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll
            >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">장바구니</Nav.Link>
        </Nav>
        <Nav>
            <Nav.Link href="/login">로그인</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Menubar
