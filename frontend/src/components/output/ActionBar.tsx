// 'use client'
// import { usePaperStore } from '@/store/paperStore'
// import api from '@/lib/api'
// import { useRouter } from 'next/navigation'

// export default function ActionBar() {
//   const { paper, setLoading } = usePaperStore()
//   const router = useRouter()

//   const handleRegenerate = async () => {
//     if (!paper?.assignmentId) return
//     try {
//       setLoading(true)
//       await api.post(`/assignments/${paper.assignmentId}/regenerate`)
//       router.refresh()
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handlePrint = () => {
//     window.print()
//   }

//   return (
//     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white shadow-xl rounded-full px-6 py-3 border border-gray-200 z-50 print:hidden">
//       <button
//         onClick={handleRegenerate}
//         className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
//       >
//         🔄 Regenerate
//       </button>
//       <div className="w-px h-5 bg-gray-200" />
//       <button
//         onClick={handlePrint}
//         className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
//       >
//         📄 Download PDF
//       </button>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import { usePaperStore } from '@/store/paperStore'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function ActionBar() {
  const { paper, setLoading } = usePaperStore()
  const [showAnswerKey, setShowAnswerKey] = useState(false)
  const router = useRouter()

  const handleRegenerate = async () => {
    if (!paper?.assignmentId) return
    try {
      setLoading(true)
      await api.post(`/assignments/${paper.assignmentId}/regenerate`)
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* Answer Key Modal */}
      {showAnswerKey && paper && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">📋 Answer Key</h2>
              <button
                onClick={() => setShowAnswerKey(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {paper.sections.map((section, si) => (
                <div key={section.id}>
                  <h3 className="font-bold text-gray-800 mb-3">
                    Section {String.fromCharCode(65 + si)}: {section.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {section.questions.map((q, qi) => (
                      <div key={q.id} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Q{qi + 1}. {q.text}
                        </p>
                        <div className="flex items-start gap-2 mt-2">
                          <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full shrink-0">
                            Answer
                          </span>
                          <p className="text-sm text-green-800">{q.answer || 'N/A'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white shadow-xl rounded-full px-6 py-3 border border-gray-200 z-40 print:hidden">
        <button
          onClick={() => setShowAnswerKey(true)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
        >
          📋 Answer Key
        </button>
        <div className="w-px h-5 bg-gray-200" />
        <button
          onClick={handleRegenerate}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          🔄 Regenerate
        </button>
        <div className="w-px h-5 bg-gray-200" />
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          📄 Download PDF
        </button>
      </div>
    </>
  )
} 