import React, { useContext } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = ({ setSelectedComponent }) => {

   const user = useContext(UserContext)

   if (!user) {
      return null
   }


   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
   }

   const handleOptionClick = (component) => {
      setSelectedComponent(component);
   };

   return (
      <Navbar expand="lg" className="bg-body-tertiary">
         <Container fluid>
            <Navbar.Brand>
               <h2>Trello</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  <NavLink onClick={() => handleOptionClick('taskboard')}>Task Board</NavLink>
                  <NavLink onClick={() => handleOptionClick('addproject')}>Project</NavLink>
               </Nav>
               <Nav>
                  <h5 className='mx-3'>Hi {user.userData.name}</h5>
                  <span style={{cursor: "pointer", color: "red"}} onClick={handleLogout} size='sm' variant='outline-danger'><LogoutIcon /></span>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavBar

