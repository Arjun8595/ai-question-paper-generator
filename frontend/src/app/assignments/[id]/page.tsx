// 'use client'
// import { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { usePaperStore } from '@/store/paperStore'
// import { useAssignmentStore } from '@/store/assignmentStore'
// import { useWebSocket } from '@/hooks/useWebSocket'
// import { useWSStore } from '@/store/wsStore'
// import QuestionPaper from '@/components/output/QuestionPaper'
// import GeneratingStatus from '@/components/status/GeneratingStatus'
// import LoadingSpinner from '@/components/status/LoadingSpinner'
// import api from '@/lib/api'

// export default function AssignmentPage() {
//   const { id } = useParams()
//   const { paper, setPaper, isLoading, setLoading } = usePaperStore()
//   const { jobId } = useAssignmentStore()
//   const { status } = useWSStore()

//   useWebSocket(jobId)

//   useEffect(() => {
//     if (!id) return
//     setLoading(true)
//     api.get(`/assignments/${id}/paper`)
//       .then((res) => setPaper(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false))
//   }, [id, status])

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <main>
//       <GeneratingStatus />
//       {paper && <QuestionPaper paper={paper} />}
//     </main>
//   )
// }

'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { usePaperStore } from '@/store/paperStore'
import { useAssignmentStore } from '@/store/assignmentStore'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useWSStore } from '@/store/wsStore'
import QuestionPaper from '@/components/output/QuestionPaper'
import GeneratingStatus from '@/components/status/GeneratingStatus'
import LoadingSpinner from '@/components/status/LoadingSpinner'
import api from '@/lib/api'

export default function AssignmentPage() {
  const { id } = useParams()
  const { paper, setPaper, isLoading, setLoading } = usePaperStore()
  const { jobId } = useAssignmentStore()
  const { status } = useWSStore()

  useWebSocket(jobId)

  const fetchPaper = async () => {
    if (!id) return
    try {
      const res = await api.get(`/assignments/${id}/paper`)
      setPaper(res.data)
    } catch (err) {
      console.log('Paper not ready yet...')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchPaper()
  }, [id])

  useEffect(() => {
    if (status === 'completed') {
      fetchPaper()
    }
  }, [status])

  if (isLoading) return <LoadingSpinner />

  return (
    <main>
      <GeneratingStatus />
      {paper ? (
        <QuestionPaper paper={paper} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Generating your question paper...</p>
        </div>
      )}
    </main>
  )
}