import express from 'express'
import multer from 'multer'
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
import { downloadFile, getAvailableSupervisors, getDashboardStats, getFeedback, getStudentProject, getSupervisor, requestSupervisor, submitProposal, uploadFiles, searchStudents, updateProposal, deleteFile, withdrawSupervisorRequest, getStudentProfile, updateStudentProfile } from '../controllers/studentController.js';
import { handleUploadError, upload } from '../middlewares/upload.js';

const router = express.Router();

router.get("/project", isAuthenticated, isAuthorized("Student"), getStudentProject);
router.post("/project-proposal", isAuthenticated, isAuthorized("Student"), submitProposal);
router.post("/upload/:projectId", isAuthenticated, isAuthorized("Student"), 
upload.array("files", 10), 
handleUploadError, 
uploadFiles);
router.get("/fetch-supervisors", isAuthenticated, isAuthorized("Student"), getAvailableSupervisors);
router.get("/supervisor", isAuthenticated, isAuthorized("Student"), getSupervisor);
router.post("/request-supervisor", isAuthenticated, isAuthorized("Student"), requestSupervisor);
router.get("/feedback/:projectId", isAuthenticated, isAuthorized("Student"), getFeedback);
router.get("/fetch-dashboard-stats", isAuthenticated, isAuthorized("Student"), getDashboardStats);
router.get("/download/:projectId/:fileId", isAuthenticated, isAuthorized("Student"), downloadFile);
router.get("/search-students", isAuthenticated, isAuthorized("Student"), searchStudents);
router.put("/project-proposal", isAuthenticated, isAuthorized("Student"), updateProposal);
router.delete("/file/:projectId/:fileId", isAuthenticated, isAuthorized("Student"), deleteFile);
router.delete("/request/:requestId", isAuthenticated, isAuthorized("Student"), withdrawSupervisorRequest);
router.get("/profile", isAuthenticated, isAuthorized("Student"), getStudentProfile);
router.put("/profile", isAuthenticated, isAuthorized("Student"), updateStudentProfile);


export default router;
