import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import axiosInstance from './AxiosInstance';
import { message} from 'antd';

import './login.css'



const Register = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!data?.name || !data?.email || !data?.password) return alert("Please fill all fields");
      else {
         axiosInstance.post('/api/user/register', data)
            .then((response) => {
               if (response.data.success) {
                  message.success(response.data.message)
                  navigate('/login')

               } else {
                  console.log(response.data.message)
                  message.error(response.data.message)
               }
            })
            .catch((error) => {
               console.log("Error", error);
            });
      }
   };


   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>Trello</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav>
                     <Link to={'/'}>Login</Link>
                     <Link to={'/register'}>Register</Link>
                  </Nav>

               </Navbar.Collapse>
            </Container>
         </Navbar>
         <div className="first-container">
            <Container component="main" style={{ height: '-webkit-fill-available', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
               <div className="box">
                  <h1 className='text-center pb-3'>Sign Up</h1>
                  <form onSubmit={handleSubmit}>
                     <div className="field">
                        <input
                           type="text"
                           name="name"
                           value={data.name}
                           onChange={handleChange}
                           required
                        />
                        <label>Full Name</label>
                     </div>
                     <div className="field">
                        <input
                           type="text"
                           name="email"
                           value={data.email}
                           onChange={handleChange}
                           required
                        />
                        <label>Email</label>
                     </div>
                     <div className="field my-3">
                        <input
                           type="password"
                           name="password"
                           value={data.password}
                           onChange={handleChange}
                           required
                        />
                        <label>Password</label>
                     </div>
                     <button type='submit' className='sub-button'>Sign up</button>
                     <div className="sign-up">
                        Not a member?
                        <Link to={'/'}>login now</Link>
                     </div>
                  </form>
               </div>
            </Container>
         </div>

      </>
   )
}

export default Register
