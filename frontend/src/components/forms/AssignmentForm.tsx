'use client'
import { useAssignmentStore } from '@/store/assignmentStore'
import { useAssignment } from '@/hooks/useAssignment'
import QuestionTypeSelector from './QuestionTypeSelector'
import FileUpload from './FileUpload'
import { useRouter } from 'next/navigation'

export default function AssignmentForm() {
  const { form, setField, isSubmitting } = useAssignmentStore()
  const { submitAssignment } = useAssignment()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!form.title || !form.subject || !form.dueDate) {
      alert('Please fill all required fields')
      return
    }
    if (form.questionTypes.length === 0) {
      alert('Please select at least one question type')
      return
    }
    try {
      const data = await submitAssignment()
      router.push(`/assignments/${data.assignmentId}`)
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Assignment</h1>

      <div className="flex flex-col gap-5">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="e.g. Mid Term Exam"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Subject *</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setField('subject', e.target.value)}
            placeholder="e.g. Mathematics"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date + Total Marks */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Due Date *</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setField('dueDate', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Total Marks *</label>
            <input
              type="number"
              min={1}
              value={form.totalMarks}
              onChange={(e) => setField('totalMarks', Number(e.target.value))}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Difficulty</label>
          <select
            value={form.difficulty}
            onChange={(e) => setField('difficulty', e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {/* Question Types */}
        <QuestionTypeSelector />

        {/* Instructions */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Additional Instructions</label>
          <textarea
            value={form.instructions}
            onChange={(e) => setField('instructions', e.target.value)}
            placeholder="Any specific instructions for the AI..."
            rows={3}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Upload Reference File (Optional)</label>
          <FileUpload onFileSelect={(file) => console.log(file)} />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {isSubmitting ? 'Generating...' : 'Generate Question Paper 🚀'}
        </button>

      </div>
    </div>
  )
}