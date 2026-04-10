"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const router = express_1.default.Router();
//Add Student
router.post('/add', student_controller_1.addStudent);
//Get All Students
router.get('/', student_controller_1.getAllStudents);
//Get Student By Id
router.get('/:id', student_controller_1.getStudentById);
//Update Student
router.put('/:id', student_controller_1.updateStudent);
//Delete Student
router.delete('/:id', student_controller_1.deleteStudent);
exports.default = router;
