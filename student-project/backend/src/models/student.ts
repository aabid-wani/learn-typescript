import pool from '../config/db';

export interface Student {
  id: string;
  first_name: string;
  last_name?: string;
  gender?: string;
  dob?: string;
  email?: string;
  phone?: string;
  alternate_phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  enrollment_number?: string;
  admission_date?: string;
  course_id?: string;
  profile_image?: string;
  status?: 'active' | 'inactive';
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export class StudentModel {
  static async findAll(): Promise<Student[]> {
    const res = await pool.query(`
      SELECT s.*, c.course_name 
      FROM students s 
      LEFT JOIN courses c ON s.course_id = c.id 
      ORDER BY s.created_at DESC
    `);
    return res.rows;
  }

  static async findById(id: string): Promise<Student | null> {
    const res = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>): Promise<Student> {
    console.log('Model create fields:', Object.keys(studentData));
    console.log('Model create values:', Object.values(studentData));
    
    const keys = Object.keys(studentData).filter(k => k !== 'created_at' && k !== 'updated_at' && studentData[k as keyof typeof studentData] !== '' && studentData[k as keyof typeof studentData] !== undefined);
    const values = keys.map(k => studentData[k as keyof typeof studentData]);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const fieldNames = keys.join(', ');
    
    if (keys.length === 0) {
      throw new Error('No valid fields to insert');
    }
    
    const query = `
      INSERT INTO students (${fieldNames})
      VALUES (${placeholders})
      RETURNING *
    `;
    console.log('Executing query:', query);
    console.log('With values:', values);
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  static async update(id: string, updates: Partial<Student>): Promise<Student | null> {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = [...Object.values(updates), id] as any[];
    const query = `UPDATE students SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
    const res = await pool.query(query, values);
    return res.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const res = await pool.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  }

  static async search(query: string): Promise<Student[]> {
    const res = await pool.query(
      `SELECT * FROM students WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1`,
      [`%${query}%`]
    );
    return res.rows;
  }
}

