const mongoose = require("mongoose");

const projectModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tasks: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Backlog", "Ready", "In Progress", "Done"],
          default: "Backlog",
        },
        tags: [
          {
            type: String,
          },
        ],
        dueDate: {
          type: Date,
        },
        assignedUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const projectSchema = mongoose.model("Project", projectModel);

module.exports = projectSchema;
