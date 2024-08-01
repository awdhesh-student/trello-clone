import React, { useContext, useState } from 'react';
import { Button, Container } from '@mui/material'
import { UserContext } from '../../App';
import AxiosInstance from '../common/AxiosInstance';
import { message } from 'antd';

const AddProject = () => {
   const user = useContext(UserContext);
   const [addProject, setAddProject] = useState({
      name: "",
      description: ""
   });

   const [task, setTask] = useState({
      name: "",
      description: "",
      status: "Backlog",
      tags: "",
      dueDate: "",
      createdBy: user.userData.name
   });

   const handleProjectChange = (e) => {
      const { name, value } = e.target;
      setAddProject({ ...addProject, [name]: value });
   };

   const handleTaskChange = (e) => {
      const { name, value } = e.target;
      setTask({ ...task, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const tagsArray = task.tags.split(',').map(tag => tag.trim());

         const projectPayload = {
            userId: user.userData._id,
            projectData: {
               name: addProject.name,
               description: addProject.description,
               tasks: [
                  {
                     ...task,
                     tags: tagsArray
                  }
               ]
            }
         };

         const res = await AxiosInstance.post("/api/user/post-project", projectPayload, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         });

         if (res.data.success) {
            message.success(res.data.message);
            setAddProject({
               name: user.userData.name,
               description: ""
            });
            setTask({
               name: "",
               description: "",
               status: "Backlog",
               tags: "",
               dueDate: "",
               createdBy: ""
            });
         }
      } catch (error) {
         console.error('Error adding project and task:', error);
      }
   };

   return (
      <div>
         <Container component="main">
            <h2>Add Project</h2>
            <div className="box w-100">
               <form onSubmit={handleSubmit}>
                  <div className="field">
                     <input
                        type="text"
                        name="name"
                        value={addProject.name}
                        onChange={handleProjectChange}
                        placeholder="Project Name"
                        required
                     />
                     <textarea
                        style={{ marginLeft: "20px" }}
                        name="description"
                        value={addProject.description}
                        onChange={handleProjectChange}
                        placeholder="Project Description"
                        required
                     ></textarea>
                  </div>
                  <hr />
                  <h3>Task Details:</h3>
                  <div className="field my-3">
                     <input
                        type="text"
                        name="name"
                        value={task.name}
                        onChange={handleTaskChange}
                        placeholder="Task Name"
                        required
                     />
                  </div>
                  <div className="field my-3">
                     <textarea
                        name="description"
                        value={task.description}
                        onChange={handleTaskChange}
                        placeholder="Task Description"
                        required
                     ></textarea>
                  </div>
                  <div className="field my-3">
                     <input
                        type="text"
                        name="tags"
                        value={task.tags}
                        onChange={handleTaskChange}
                        placeholder="Tags (comma separated)"
                     />
                  </div>
                  <div className="field my-3">
                     <input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleTaskChange}
                        placeholder="Due Date"
                     />
                     <input
                        style={{ marginLeft: "20px" }}
                        type="text"
                        name="assignedUser"
                        value={task.createdBy}
                        disabled
                        required
                     />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", margin: '15px auto' }}>
                     <Button type="submit" size='small' variant="contained" color='info'>Submit</Button>
                  </div>
               </form>
               <h6 className='text-start pb-3 text-danger'>
                  Note: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore commodi ea animi pariatur odio sed nam, expedita quasi ducimus dignissimos.
               </h6>
            </div>
         </Container>
      </div>
   );
};

export default AddProject;
