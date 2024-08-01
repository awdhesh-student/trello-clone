import React, { useEffect, useState } from 'react';
import AxiosInstance from '../common/AxiosInstance';
import { Button } from "@mui/material";
import { message } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import UpdateIcon from '@mui/icons-material/Update';

const TaskBoard = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'Backlog',
    tags: "",
    dueDate: new Date().toISOString().slice(0, 10),
  });
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const fetchAllProjects = async () => {
    try {
      const res = await AxiosInstance.get('/api/user/fetch-all-project', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setAllProjects(res.data.allData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const getTasksByStatus = (status) => {
    let tasks = [];
    allProjects.forEach((project) => {
      const projectTasks = project.tasks
        .filter((task) => task.status === status)
        .map((task) => ({
          ...task,
          projectID: project._id,
          projectName: project.name
        }));
      tasks = tasks.concat(projectTasks);
    });
    return tasks;
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleAdd = (projectId) => {
    setNewTask({
      name: '',
      description: '',
      status: 'Backlog',
      tags: "",
      dueDate: new Date().toISOString().slice(0, 10),
    });
    setCurrentProjectId(projectId);
    setShowAddModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleNewTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleStatusChange = (e) => {
    setSelectedTask(prevTask => ({
      ...prevTask,
      status: e.target.value
    }));
  };

  const handleNewTaskStatusChange = (e) => {
    setNewTask(prevTask => ({
      ...prevTask,
      status: e.target.value
    }));
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosInstance.patch(`/api/user/update-task/${selectedTask._id}`, selectedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        fetchAllProjects();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setShowUpdateModal(false);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const tagsArray = newTask.tags.split(',').map(tag => tag.trim());

    const newPayload = {
      ...newTask,
      tags: tagsArray
    }

    try {
      const res = await AxiosInstance.post(`/api/user/add-task/${currentProjectId}`, newPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        fetchAllProjects();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setShowAddModal(false);
  };

  const renderTasks = (tasks) => {
    return tasks.map((task) => (
      <div className={`task-card ${task.status === "Done" ? "opacity-dim" : ""}`} key={`${task._id}-${task.projectID}`}>
        <h5>Project: {task.projectName}</h5>
        <p><b>Task Name: </b>{task.name}</p>
        <p><b>Task Description: </b>{task.description}</p>
        <p><b>Due:</b> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p><b>Tags:</b> {Array.isArray(task.tags) ? task.tags.join(', ') : ''}</p>
        <div className='d-flex justify-content-between'>
          {task.status !== "Done" ? (
            <>
              {task.status === "Ready" || task.status === "In Progress" ? (
                <Tooltip title="Update" arrow>
                  <Button onClick={() => handleUpdate(task)}><UpdateIcon /></Button>
                </Tooltip>
              ) : task.status === "Backlog" ? (
                <>
                  <Tooltip title="Add" arrow>
                    <Button onClick={() => handleAdd(task.projectID)}><AddIcon /></Button>
                  </Tooltip>
                  <Tooltip title="Update" arrow>

                    <Button onClick={() => handleUpdate(task)}><UpdateIcon /></Button>
                  </Tooltip>
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    ));
  };

  return (
    <div className="task-board">
      <div className="task-column">
        <h3 className='text-secondary'>Backlogs</h3>
        {renderTasks(getTasksByStatus('Backlog'))}
      </div>
      <div className="task-column">
        <h3 className='text-warning'>In Progress</h3>
        {renderTasks(getTasksByStatus('In Progress'))}
      </div>
      <div className="task-column">
        <h3 className='text-primary'>Ready</h3>
        {renderTasks(getTasksByStatus('Ready'))}
      </div>
      <div className="task-column">
        <h3 className='text-success'>Done</h3>
        {renderTasks(getTasksByStatus('Done'))}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <>
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }}></div>
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Add New Task</h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={addTask}>
                    <div className="mb-3">
                      <label htmlFor="new-task-name" className="col-form-label">Task Name:</label>
                      <input
                        name="name"
                        value={newTask.name}
                        onChange={handleNewTaskInputChange}
                        type="text"
                        className="form-control"
                        id="new-task-name"
                      />
                      <label htmlFor="new-task-description" className="col-form-label">Task Description:</label>
                      <input
                        name="description"
                        value={newTask.description}
                        onChange={handleNewTaskInputChange}
                        type="text"
                        className="form-control"
                        id="new-task-description"
                      />
                      <label htmlFor="new-task-dueDate" className="col-form-label">Due Date:</label>
                      <input
                        name="dueDate"
                        value={newTask.dueDate.slice(0, 10)}
                        onChange={handleNewTaskInputChange}
                        type="date"
                        className="form-control"
                        id="new-task-dueDate"
                      />
                      <label htmlFor="new-task-tags" className="col-form-label">Tags:</label>
                      <input
                        name="tags"
                        value={newTask.tags}
                        placeholder="Tags (comma separated)"
                        onChange={handleNewTaskInputChange}
                        type="text"
                        className="form-control"
                        id="new-task-tags"
                      />
                      <label htmlFor="new-task-status" className="col-form-label">Status:</label>
                      <select
                        name="status"
                        value={newTask.status}
                        onChange={handleNewTaskStatusChange}
                        className="form-select"
                        id="new-task-status"
                      >
                        <option value="Backlog">Backlog</option>
                        <option value="Ready">Ready</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <Button type="submit" className="btn btn-primary">Add Task</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Update Task Modal */}
      {showUpdateModal && selectedTask && (
        <>
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }}></div>
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Update Task</h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowUpdateModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={updateTask}>
                    <div className="mb-3">
                      <label htmlFor="update-task-name" className="col-form-label">Task Name:</label>
                      <input
                        name="name"
                        value={selectedTask.name}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="update-task-name"
                      />
                      <label htmlFor="update-task-description" className="col-form-label">Task Description:</label>
                      <input
                        name="description"
                        value={selectedTask.description}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="update-task-description"
                      />
                      <label htmlFor="update-task-dueDate" className="col-form-label">Due Date:</label>
                      <input
                        name="dueDate"
                        value={selectedTask.dueDate.slice(0, 10)}
                        onChange={handleInputChange}
                        type="date"
                        className="form-control"
                        id="update-task-dueDate"
                      />
                      <label htmlFor="update-task-tags" className="col-form-label">Tags:</label>
                      <input
                        name="tags"
                        value={Array.isArray(selectedTask.tags) ? selectedTask.tags.join(', ') : ''}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="update-task-tags"
                      />
                      <label htmlFor="update-task-status" className="col-form-label">Status:</label>
                      <select
                        name="status"
                        value={selectedTask.status}
                        onChange={handleStatusChange}
                        className="form-select"
                        id="update-task-status"
                      >
                        <option value="Backlog">Backlog</option>
                        <option value="Ready">Ready</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <Button type="submit" className="btn btn-primary">Update Task</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskBoard;


