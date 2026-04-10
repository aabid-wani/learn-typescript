import express from 'express';
import { addStudents, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/student-controller';  
const router = express.Router();

//Add Student
router.post('/add', addStudents);
//Get All Students
router.get('/', getAllStudents);
//Get Student By Id
router.get('/:id', getStudentById);
//Update Student
router.put('/:id', updateStudent);
//Delete Student
router.delete('/:id', deleteStudent);

export default router;
