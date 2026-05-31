import DifficultyBadge from './DifficultyBadge'
import { Question } from '@/types/paper'

interface Props {
  question: Question
  index: number
}

export default function QuestionCard({ question, index }: Props) {
  return (
    <div className="flex flex-col gap-2 py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <p className="text-gray-800 text-sm flex-1">
          <span className="font-semibold mr-2">{index}.</span>
          {question.text}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-xs text-gray-500 font-medium">
            [{question.marks} marks]
          </span>
        </div>
      </div>

      {question.options && question.options.length > 0 && (
        <div className="ml-5 grid grid-cols-2 gap-1">
          {question.options.map((opt, i) => (
            <p key={i} className="text-sm text-gray-600">
              {String.fromCharCode(65 + i)}. {opt}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}