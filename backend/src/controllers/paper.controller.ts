import { Request, Response } from 'express'
import GeneratedPaper from '../models/GeneratedPaper'
import { getCache, setCache } from '../services/cache.service'

export const getPaperByAssignmentId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    console.log('Fetching paper for assignment:', id)

    const cached = await getCache(`paper:${id}`)
    if (cached) {
      console.log('Returning cached paper ✅')
      return res.json(cached)
    }

    const paper = await GeneratedPaper.findOne({ assignmentId: id })
    console.log('Paper from DB:', paper ? 'Found ✅' : 'Not Found ❌')
    
    if (!paper) return res.status(404).json({ message: 'Paper not found' })

    await setCache(`paper:${id}`, paper)
    res.json(paper)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}