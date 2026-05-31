import { useAssignmentStore } from '@/store/assignmentStore'
import { useWSStore } from '@/store/wsStore'
import api from '@/lib/api'

export const useAssignment = () => {
  const { form, setJobId, setIsSubmitting } = useAssignmentStore()
  const { reset: resetWS } = useWSStore()

  const submitAssignment = async () => {
    try {
      setIsSubmitting(true)
      resetWS()
      const res = await api.post('/assignments', form)
      setJobId(res.data.jobId)
      return res.data
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitAssignment }
}