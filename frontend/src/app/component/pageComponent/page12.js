'use client'

import { useState, useEffect } from 'react'

const Page12 = ({ formData, updateFormData, onNext, onPrev }) => {
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (formData.foodIssuesFaced && formData.foodIssuesFaced.length > 0) {
      setError('')
      onNext()
    } else {
      setError('Please select at least one option')
    }
  }

  const sourceOptions = [
    'Bad Taste',
    'Bad Meal Planning',
    'Shortage of Items',
    'Lack of cooking ingredients & spices',
    'Small Portion Size',
    'Served Cold & Unclean',
    'Unwelcoming Service',
    'Other',
  ]

  const handleOptionChange = option => {
    const currentSources = formData.foodIssuesFaced || []
    const newSources = currentSources.includes(option)
      ? currentSources.filter(item => item !== option)
      : [...currentSources, option]

    updateFormData({ foodIssuesFaced: newSources })
  }

  useEffect(() => {
    if (formData.foodIssuesFaced && formData.foodIssuesFaced.length > 0) {
      setError('')
    }
  }, [formData.foodIssuesFaced])

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        8. What are the issues you faced?
      </h2>

      <div className="space-y-1">
        {sourceOptions.map(option => (
          <label
            key={option}
            className="flex items-center gap-3 text-[16px] text-gray-600 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
              {formData.foodIssuesFaced?.includes(option) && (
                <div className="w-3 h-3 bg-[#6366F1] rounded-sm"></div>
              )}
            </div>
            <input
              type="checkbox"
              name="foodIssuesFaced"
              value={option}
              checked={formData.foodIssuesFaced?.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="hidden"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={onPrev}
            className="bg-[#E5E7EB] text-gray-700 px-8 py-2.5 rounded-sm hover:bg-[#D80075] transition-colors text-[13px] font-semibold"
          >
            Prev
          </button>
          <button
            type="submit"
            className=" text-white font-medium px-8 py-2 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  )
}

export default Page12
