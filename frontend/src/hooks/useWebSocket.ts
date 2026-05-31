import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useWSStore } from '@/store/wsStore'
import { usePaperStore } from '@/store/paperStore'
import { WSMessage } from '@/types/ws'

export const useWebSocket = (jobId: string | null) => {
  const socketRef = useRef<Socket | null>(null)
  const { setStatus, setProgress, setMessage } = useWSStore()
  const { setPaper } = usePaperStore()

  useEffect(() => {
    if (!jobId) return

    socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')

    socketRef.current.emit('join', jobId)

    socketRef.current.on('job:progress', (data: WSMessage) => {
      setStatus(data.status)
      setProgress(data.progress || 0)
      setMessage(data.message || '')
    })

    socketRef.current.on('job:completed', (data: WSMessage) => {
      setStatus('completed')
      setProgress(100)
      setMessage('Question paper generated!')
    })

    socketRef.current.on('job:failed', (data: WSMessage) => {
      setStatus('failed')
      setMessage(data.error || 'Something went wrong')
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [jobId])
}