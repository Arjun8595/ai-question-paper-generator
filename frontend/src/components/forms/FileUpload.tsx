'use client'
import { useState } from 'react'

interface Props {
  onFileSelect: (file: File) => void
}

export default function FileUpload({ onFileSelect }: Props) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain') {
      setFileName(file.name)
      onFileSelect(file)
    } else {
      alert('Only PDF or TXT files allowed')
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
        dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      }}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        id="fileInput"
        type="file"
        accept=".pdf,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      {fileName ? (
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">📄</span>
          <p className="text-sm text-gray-700 font-medium">{fileName}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl">☁️</span>
          <p className="text-sm text-gray-500">
            Drag & drop a PDF or TXT file here
          </p>
          <p className="text-xs text-gray-400">or click to browse</p>
        </div>
      )}
    </div>
  )
}