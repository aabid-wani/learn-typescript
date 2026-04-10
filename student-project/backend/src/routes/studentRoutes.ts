import { Router } from 'express';
import { StudentController } from '../controllers/studentController';

const router = Router();

router.get('/', StudentController.getAll);
router.post('/add', StudentController.create);
router.get('/:id', StudentController.getById);
router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.delete);
router.get('/search', StudentController.search);

export default router;

