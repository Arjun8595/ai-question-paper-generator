import { Router } from 'express'
import { getPaperByAssignmentId } from '../controllers/paper.controller'

const router = Router()

router.get('/:id/paper', getPaperByAssignmentId)

export default router