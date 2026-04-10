import {Request ,Response} from 'express';
import { Student } from '../models/student';

let students: Student[] = [];

//Add Student
export const addStudents = (req: Request, res: Response) => {
    try {
        const student: Student = req.body;
        students.push(student);
        res.json({message: "Student add Successfully..!",students});
    } catch (error) {
        res.status(500).json({message: "Error adding student"});
    }
};

//Get All Students
export const getAllStudents = (req: Request, res: Response) => {
    try {
        res.json(students); 
    } catch (error) {
        res.status(500).json({message: "Error fetching students"});
    }
};

//Get Student By Id
export const getStudentById = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const student = students.find(s => s.id === id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({message: "Student not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching student"});
    }
};

//Update Student
export const updateStudent = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = req.body;
            res.json({message: "Student updated Successfully..!",students});
        } else {
            res.status(404).json({message: "Student not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Error updating student"});
    }
};

//Delete Student
export const deleteStudent = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id); 
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            res.json({message: "Student deleted Successfully..!",students});
        }
        else {
            res.status(404).json({message: "Student not found"});
        }   
    } catch (error) {
        res.status(500).json({message: "Error deleting student"});
    }
};