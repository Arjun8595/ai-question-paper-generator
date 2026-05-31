import { GeneratedPaper } from '@/types/paper'
import SectionBlock from './SectionBlock'
import StudentInfoForm from './StudentInfoForm'
import ActionBar from './ActionBar'

interface Props {
  paper: GeneratedPaper
}

export default function QuestionPaper({ paper }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 print:shadow-none print:border-0">

        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold text-gray-900">{paper.title}</h1>
          <p className="text-gray-500 mt-1">{paper.subject}</p>
          <div className="flex justify-center gap-8 mt-4 text-sm text-gray-600">
            <span>Total Marks: <strong>{paper.totalMarks}</strong></span>
            {paper.duration && (
              <span>Duration: <strong>{paper.duration} mins</strong></span>
            )}
          </div>
        </div>

        {/* Student Info */}
        <StudentInfoForm />

        {/* Sections */}
        {paper.sections.map((section, i) => (
          <SectionBlock key={section.id} section={section} sectionIndex={i} />
        ))}

      </div>

      {/* Action Bar */}
      <ActionBar />
    </div>
  )
}