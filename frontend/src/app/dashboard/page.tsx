'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Assignment } from '@/types/assignment'
import Link from 'next/link'

export default function DashboardPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/assignments')
      .then((res) => setAssignments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Assignments</h1>
          <Link
            href="/create"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            + New Assignment
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : assignments.length === 0 ? (
          <p className="text-gray-500 text-sm">No assignments yet. Create one!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {assignments.map((a) => (
              <Link
                key={a._id}
                href={`/assignments/${a._id}`}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{a.title}</p>
                    <p className="text-sm text-gray-500">{a.subject}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    a.status === 'completed' ? 'bg-green-100 text-green-700' :
                    a.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    a.status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {a.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}