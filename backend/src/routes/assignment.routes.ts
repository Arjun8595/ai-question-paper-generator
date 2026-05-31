import { Router } from 'express'
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  regenerateAssignment,
} from '../controllers/assignment.controller'
import { validateAssignment } from '../middleware/validate'

const router = Router()

router.post('/', validateAssignment, createAssignment)
router.get('/', getAssignments)
router.get('/:id', getAssignmentById)
router.post('/:id/regenerate', regenerateAssignment)

export default router