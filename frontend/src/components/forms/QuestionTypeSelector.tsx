'use client'
import { useAssignmentStore } from '@/store/assignmentStore'
import { QuestionType } from '@/types/assignment'

const QUESTION_TYPES = [
  { label: 'MCQ', value: 'mcq' },
  { label: 'Short Answer', value: 'short' },
  { label: 'Long Answer', value: 'long' },
  { label: 'True / False', value: 'truefalse' },
]

export default function QuestionTypeSelector() {
  const { form, setQuestionTypes } = useAssignmentStore()

  const handleToggle = (type: QuestionType['type']) => {
    const exists = form.questionTypes.find((q) => q.type === type)
    if (exists) {
      setQuestionTypes(form.questionTypes.filter((q) => q.type !== type))
    } else {
      setQuestionTypes([...form.questionTypes, { type, count: 5, marks: 2 }])
    }
  }

  const handleChange = (
    type: QuestionType['type'],
    field: 'count' | 'marks',
    value: number
  ) => {
    setQuestionTypes(
      form.questionTypes.map((q) =>
        q.type === type ? { ...q, [field]: value } : q
      )
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">Question Types</label>
      <div className="grid grid-cols-2 gap-3">
        {QUESTION_TYPES.map((qt) => {
          const selected = form.questionTypes.find((q) => q.type === qt.value)
          return (
            <div
              key={qt.value}
              className={`border rounded-xl p-3 cursor-pointer transition-all ${
                selected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleToggle(qt.value as QuestionType['type'])}
            >
              <p className="text-sm font-medium text-gray-800">{qt.label}</p>
              {selected && (
                <div
                  className="flex gap-2 mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-gray-500">Questions</label>
                    <input
                      type="number"
                      min={1}
                      value={selected.count}
                      onChange={(e) =>
                        handleChange(
                          qt.value as QuestionType['type'],
                          'count',
                          Number(e.target.value)
                        )
                      }
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-gray-500">Marks each</label>
                    <input
                      type="number"
                      min={1}
                      value={selected.marks}
                      onChange={(e) =>
                        handleChange(
                          qt.value as QuestionType['type'],
                          'marks',
                          Number(e.target.value)
                        )
                      }
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}