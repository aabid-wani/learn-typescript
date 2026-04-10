"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_1 = require("../models/student");
class StudentController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield student_1.StudentModel.findAll();
                res.json(students);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch students' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const student = yield student_1.StudentModel.findById(id);
                if (!student) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                res.json(student);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch student' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentData = req.body;
                const student = yield student_1.StudentModel.create(studentData);
                res.status(201).json(student);
            }
            catch (error) {
                res.status(400).json({ error: 'Failed to create student' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updates = req.body;
                const id = String(req.params.id);
                const student = yield student_1.StudentModel.update(id, updates);
                if (!student) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                res.json(student);
            }
            catch (error) {
                res.status(400).json({ error: 'Failed to update student' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = String(req.params.id);
                const deleted = yield student_1.StudentModel.delete(id);
                if (!deleted) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                res.json({ message: 'Student deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete student' });
            }
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const query = ((_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                const students = yield student_1.StudentModel.search(query);
                res.json(students);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to search students' });
            }
        });
    }
}
exports.StudentController = StudentController;
