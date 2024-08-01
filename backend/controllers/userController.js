const projectSchema = require("../schemas/projectModal");

const postProjectController = async (req, res) => {
  const { userId, projectData } = req.body;
  const { name, description, tasks } = projectData;

  try {
    const project = new projectSchema({
      createdBy: userId,
      name,
      description,
      tasks,
    });

    console.log(project);

    const savedProject = await project.save();

    res.status(200).json({
      success: true,
      message: "Project and tasks saved successfully",
      data: savedProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllProjectsController = async (req, res) => {
  try {
    const projects = await projectSchema.find();
    if (!projects)
      return res.status(404).json({
        success: false,
        message: "No projects found",
      });

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      allData: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateTaskController = async (req, res) => {
  const { taskId } = req.params;
  const { projectID, name, description, status, tags, dueDate } = req.body;

  try {
    const project = await projectSchema.findById(projectID);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const taskIndex = project.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    project.tasks[taskIndex] = {
      ...project.tasks[taskIndex],
      name: name || project.tasks[taskIndex].name,
      description: description || project.tasks[taskIndex].description,
      status: status || project.tasks[taskIndex].status,
      tags: tags || project.tasks[taskIndex].tags,
      dueDate: dueDate || project.tasks[taskIndex].dueDate,
    };

    await project.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addTaskController = async (req, res) => {
  const { projectId } = req.params;
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Task payload is required",
    });
  }

  try {
    const project = await projectSchema.findByIdAndUpdate(
      projectId,
      {
        $push: {
          tasks: req.body,
        },
      },
      {
        new: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "No project found with the given ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task added successfully",
      
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  postProjectController,
  getAllProjectsController,
  updateTaskController,
  addTaskController,
};
