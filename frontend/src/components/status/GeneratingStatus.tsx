'use client'
import { useWSStore } from '@/store/wsStore'

export default function GeneratingStatus() {
  const { status, progress, message } = useWSStore()

  if (!status || status === 'completed' || status === 'failed') return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Generating Question Paper...
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-600 text-sm text-center">{message}</p>
      </div>
    </div>
  )
}