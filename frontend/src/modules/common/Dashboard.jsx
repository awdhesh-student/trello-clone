import React, { useContext, useState } from 'react';
import NavBar from './NavBar';

import { Container } from 'react-bootstrap';
import TaskBoard from '../components/TaskBoard';
import AddProject from '../components/AddProject';


const Dashboard = () => {
   const [selectedComponent, setSelectedComponent] = useState('home');

   const renderSelectedComponent = () => {
      switch (selectedComponent) {
         case 'taskboard':
            return <TaskBoard />
         case 'addproject':
            return <AddProject />
         default:
            return <TaskBoard />

      }
   };
   return (
      <>
         <NavBar setSelectedComponent={setSelectedComponent} />
         <div className='all-bg'>
            <Container className='my-3'>
               {renderSelectedComponent()}
            </Container>
         </div >
      </>
   );
};

export default Dashboard;


