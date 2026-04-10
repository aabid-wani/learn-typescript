import { Request, Response } from 'express';
import { StudentModel, Student } from '../models/student';

export class StudentController {
  static async getAll(req: Request, res: Response) {
    try {
      const students = await StudentModel.findAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const student = await StudentModel.findById(id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      console.log('Create student data:', JSON.stringify(req.body, null, 2));
      const studentData = req.body as Omit<Student, 'id' | 'created_at' | 'updated_at'>;
      const student = await StudentModel.create(studentData);
      res.status(201).json(student);
    } catch (error: any) {
      console.error('Create error:', error.message);
      console.error('Stack:', error.stack);
      res.status(400).json({ 
        error: 'Failed to create student', 
        details: error.message,
        data: req.body 
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updates = req.body as Partial<Student>;
      const id = String(req.params.id);
      const student = await StudentModel.update(id, updates);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update student' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      let id = String(req.params.id);
      const deleted = await StudentModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete student' });
    }
  }

  static async search(req: Request, res: Response) {
    try {
      const query = (req.query.q as string)?.toString() || '';
      const students = await StudentModel.search(query);
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search students' });
    }
  }
}

