export default function StudentInfoForm() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Student Name</label>
        <div className="border-b border-gray-400 h-7" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Roll Number</label>
        <div className="border-b border-gray-400 h-7" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Section</label>
        <div className="border-b border-gray-400 h-7" />
      </div>
    </div>
  )
}