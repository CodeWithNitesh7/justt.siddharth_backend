const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { addProject, getProjects, deleteProject, updateProjects } = require("../controller/projects.controller");
const router = express.Router();

router.post('/create',auth ,addProject);
router.get('/getProject', getProjects);
router.delete('/remove/:id',
    auth,
    deleteProject);
router.put('/update/:id',
    auth,
    updateProjects);

module.exports = router;