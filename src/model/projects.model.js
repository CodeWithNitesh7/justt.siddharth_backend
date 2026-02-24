const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },

    stack: {
      type: [String], // Better than single string
      required: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Description too long"],
    },

    git:{
      type: String,
      trim: true,
    },

    liveLink: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
