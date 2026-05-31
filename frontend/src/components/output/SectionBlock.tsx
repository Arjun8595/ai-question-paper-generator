import { Section } from '@/types/paper'
import QuestionCard from './QuestionCard'

interface Props {
  section: Section
  sectionIndex: number
}

export default function SectionBlock({ section, sectionIndex }: Props) {
  const sectionLetter = String.fromCharCode(65 + sectionIndex)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">
          Section {sectionLetter}: {section.title}
        </h2>
        <span className="text-sm text-gray-500 font-medium">
          Total: {section.totalMarks} marks
        </span>
      </div>
      <p className="text-sm text-gray-500 italic mb-4">{section.instruction}</p>
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-2">
        {section.questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i + 1} />
        ))}
      </div>
    </div>
  )
}