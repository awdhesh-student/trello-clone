import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import axiosInstance from './AxiosInstance';
import { message } from 'antd';

import "./login.css"

const Login = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      email: "",
      password: "",
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!data?.email || !data?.password) {
         return message.info("Please fill all fields");
      } else {
         axiosInstance.post('/api/user/login', data)
            .then((res) => {
               if (res.data.success) {
                  message.success(res.data.message)

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.userData));
                  navigate('/dashboard')
                  setTimeout(() => {
                     window.location.reload()
                  }, 1000)
               } else {
                  message.error(res.data.message)
               }
            })
            .catch((err) => {
               if (err.response && err.response.status === 401) {
                  message.error("User doesn't exist");
               }
               navigate("/login");
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

         <div className='first-container'>
            <Container component="main" style={{ height: '-webkit-fill-available', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
               <div className="box">
                  <h1 className='text-center pb-3'>Login</h1>
                  <form onSubmit={handleSubmit}>
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
                     <div className="field">
                        <input
                           type="password"
                           name="password"
                           value={data.password}
                           onChange={handleChange}
                           required
                        />
                        <label>Password</label>
                     </div>
                     <button type='submit' className='sub-button'>Sign in</button>
                     <div className="sign-up">
                        Not a member?
                        <Link to={'/register'}>signup now</Link>
                     </div>
                  </form>
               </div>
            </Container>
         </div>

      </>
   )
}

export default Login



