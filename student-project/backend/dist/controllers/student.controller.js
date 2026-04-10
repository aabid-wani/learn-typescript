"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.addStudent = void 0;
let students = [
    { id: 1, name: "Alice", age: 20, isEnrolled: true },
    { id: 2, name: "Bob", age: 22, isEnrolled: false },
    { id: 3, name: "Charlie", age: 19, isEnrolled: true }
];
//Add Student
const addStudent = (req, res) => {
    try {
        const student = req.body;
        students.push(student);
        res.json({ message: "Student add Successfully..!", students });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding student" });
    }
};
exports.addStudent = addStudent;
//Get All Students
const getAllStudents = (req, res) => {
    try {
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
};
exports.getAllStudents = getAllStudents;
//Get Student By Id
const getStudentById = (req, res) => {
    try {
        const id = Number(req.params.id);
        const student = students.find(s => s.id === id);
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ message: "Student not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching student" });
    }
};
exports.getStudentById = getStudentById;
//Update Student
const updateStudent = (req, res) => {
    try {
        const id = Number(req.params.id);
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = req.body;
            res.json({ message: "Student updated Successfully..!", students });
        }
        else {
            res.status(404).json({ message: "Student not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
};
exports.updateStudent = updateStudent;
//Delete Student
const deleteStudent = (req, res) => {
    try {
        const id = Number(req.params.id);
        students = students.filter(s => s.id !== id);
        res.json({ message: "Student deleted Successfully..!", students });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
};
exports.deleteStudent = deleteStudent;
