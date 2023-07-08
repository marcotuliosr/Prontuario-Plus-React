import Logo from "../../assets/equipe-medica.png"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header({ active }) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home"><img className="logo" src={Logo} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="medico">MEDICO</Nav.Link>
                        <Nav.Link href="paciente">PACIENTE</Nav.Link>
                        <Nav.Link href="consulta">CONSULTA</Nav.Link>
                        <Nav.Link href="carteirinha">CARTEIRINHA</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}