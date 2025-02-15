'use client'

import { useGlobalContext } from '@/app/context/Context'
import { useState } from 'react'

export default function Page5({ formData, updateFormData, onNext, onPrev }) {
  const [error, setError] = useState(false)
  const { t } = useGlobalContext()

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
    <div className=" mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl leading-tight font-medium text-gray-800 mt-1">
          {t.page_two_ques}
        </h2>
      </div>

      <div className="space-y-6">
        {ratingCategories.map((category, index) => {
          const fieldName = `rating_${category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')}`

          const hasError = error && !formData[fieldName]

          return (
            <div
              key={category}
              className={`p-2 flex flex-col sm:flex-row sm:items-center sm:justify-between
                ${hasError ? 'border border-red-300 rounded-md' : ''}`}
            >
              <span className="text-[#6366F1] text-sm sm:text-base mb-2 sm:mb-0">
                {index === 0 && t.page_two_op1}
                {index === 1 && t.page_two_op2}
                {index === 2 && t.page_two_op3}
                {index === 3 && t.page_two_op4}
                {index === 4 && t.page_two_op5}
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-1 justify-between sm:justify-end sm:w-[300px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(category, star)}
                    className={`flex-shrink-0 w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-md transition-colors text-sm
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
        <div className="mt-4 text-red-500 text-sm">{t.page_two_err}</div>
      )}

      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors min-w-[100px]"
        >
          {t.previous}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2.5 bg-[#6366F1] text-white text-sm rounded-md hover:bg-opacity-90 transition-colors min-w-[100px]"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}
