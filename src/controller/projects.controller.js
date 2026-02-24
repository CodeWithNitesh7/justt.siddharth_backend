const Project = require("../model/projects.model");

exports.addProject = async (req, res) => {
  try {
    const {name, stack, desc, git, liveLink } = req.body;

    
    if (!name || !stack || !desc) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const newProject = new Project({
      name,
      stack,
      desc,
      git,
      liveLink,
    });

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });

  } catch (error) {
    console.error("Create Project Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error:error.message
    });
  }
};

// delete projects 

exports.deleteProject= async(req, res)=>{
try {
    const {id }= req.params;
    if(!id ) {
        return res.status(400).json({
            sucess:false,
            message:" Required Project id ? "
        })
    }

    const Existing = await Project.findByIdAndDelete(id);
    if(!Existing){
        return res.status(404).json({
            sucess:false,
            message:'Projects Not Found '
        });
    }

    return res.status(200).json({
        sucess:true,
        message:"Project Delete Sucessfully "

    })
} catch (error) {
    return res.status(500).json({
        sucess:false,
        message:"Internal Server Error ",
        error:error.message
    
    })
    
}
}


// get all projects 
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: projects.length,
      data: projects,
    });

  } catch (error) {
    console.error("Get Projects Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Update Project
exports.updateProjects = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body, // jo fields update karni hain
      {
        new: true,        // updated document return karega
        runValidators: true, // schema validation follow karega
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });

  } catch (error) {
    console.error("Update Project Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};