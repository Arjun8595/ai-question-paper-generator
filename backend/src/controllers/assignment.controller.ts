import { Request, Response } from 'express'
import Assignment from '../models/Assignment'
import { generationQueue } from '../config/bull'

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.create(req.body)

    const job = await generationQueue.add('generate', {
      assignmentId: assignment._id.toString(),
      assignment: req.body,
    })

    res.status(201).json({
      assignmentId: assignment._id.toString(),
      jobId: job.id,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 })
    res.json(assignments)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' })
    res.json(assignment)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const regenerateAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' })

    await Assignment.findByIdAndUpdate(req.params.id, { status: 'pending' })

    const job = await generationQueue.add('generate', {
      assignmentId: assignment._id.toString(),
      assignment: assignment.toObject(),
    })

    res.json({ jobId: job.id })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}