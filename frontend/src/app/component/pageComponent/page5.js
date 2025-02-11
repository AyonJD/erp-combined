'use client'

import { useState } from 'react'

export default function Page5({ formData, updateFormData, onNext, onPrev }) {
  const [error, setError] = useState(false)

  const ratingCategories = [
    'Food Taste',
    'Cooking Quality',
    'Meal Planning',
    'Service Quality',
    'Dine-in Environment & Hygiene',
  ]

  const handleRatingChange = (category, rating) => {
    const fieldName = `rating_${category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')}`

    updateFormData({ [fieldName]: rating })
    setError(false)
  }

  const handleNext = () => {
    const isAllRated = ratingCategories.every(category => {
      const fieldName = `rating_${category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}`

      return formData[fieldName] !== null && formData[fieldName] !== undefined
    })

    if (!isAllRated) {
      setError(true)
      return
    }

    onNext()
  }

  return (
    <div className="max-w-2xl mx-auto p-2">
      <div className="mb-6">
        <h2 className="text-[24px] leading-tight font-medium text-gray-800 mt-1">
          2. How will you rate the quality of food this week?
        </h2>
      </div>

      <div className="space-y-4">
        {ratingCategories.map(category => {
          const fieldName = `rating_${category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')}`

          const hasError = error && !formData[fieldName]

          return (
            <div
              key={category}
              className={`p-2 flex items-center justify-between
                ${hasError ? 'border border-red-300' : ''}`}
            >
              <span className="text-[#6366F1] text-[13px]">{category}</span>
              <div className="flex gap-1 w-[300px] h-[20px] items-center justify-between">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(category, star)}
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md transition-colors
                      ${
                        formData[fieldName] === star
                          ? 'bg-[#6366F1] text-white shadow-sm'
                          : 'bg-gray-300 text-gray-500 hover:bg-gray-200'
                      }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          Please rate all categories before proceeding.
        </div>
      )}

      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-8 py-2.5 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors min-w-[100px]"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-2.5 bg-[#6366F1] text-white text-sm rounded-md hover:bg-opacity-90 transition-colors min-w-[100px]"
        >
          Next
        </button>
      </div>
    </div>
  )
}
