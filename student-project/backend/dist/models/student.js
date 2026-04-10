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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const db_1 = __importDefault(require("../config/db"));
class StudentModel {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`
      SELECT s.*, c.course_name 
      FROM students s 
      LEFT JOIN courses c ON s.course_id = c.id 
      ORDER BY s.created_at DESC
    `);
            return res.rows;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query('SELECT * FROM students WHERE id = $1', [id]);
            return res.rows[0] || null;
        });
    }
    static create(studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO students (first_name, last_name, gender, dob, email, phone, alternate_phone, 
        address, city, state, country, zip_code, enrollment_number, admission_date, course_id, 
        profile_image, status, remarks)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `;
            const values = Object.values(studentData);
            const res = yield db_1.default.query(query, values);
            return res.rows[0];
        });
    }
    static update(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
            const values = [...Object.values(updates), id];
            const query = `UPDATE students SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
            const res = yield db_1.default.query(query, values);
            return res.rows[0] || null;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);
            return res.rows.length > 0;
        });
    }
    static search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`SELECT * FROM students WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1`, [`%${query}%`]);
            return res.rows;
        });
    }
}
exports.StudentModel = StudentModel;
