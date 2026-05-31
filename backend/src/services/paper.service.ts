import { GeneratedPaperData } from '../types'
import GeneratedPaper from '../models/GeneratedPaper'
import Assignment from '../models/Assignment'
import { setCache } from './cache.service'

export const savePaper = async (assignmentId: string, data: GeneratedPaperData) => {
  const paper = await GeneratedPaper.create({
    assignmentId,
    ...data,
  })

  await Assignment.findByIdAndUpdate(assignmentId, { status: 'completed' })
  await setCache(`paper:${assignmentId}`, paper)

  return paper
  }