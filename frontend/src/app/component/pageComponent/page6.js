'use client'

import { useGlobalContext } from '@/app/context/Context'
import { useState } from 'react'

export default function Page6({ formData, updateFormData, onNext, onPrev }) {
  const [error, setError] = useState(false)
  const { t } = useGlobalContext()

  const handleRatingChange = value => {
    updateFormData({ serviceRating: value })
    setError(false)
  }

  const handleNext = () => {
    if (!formData.serviceRating) {
      setError(true)
      return
    }
    onNext()
  }

  const emojis = [
    { value: 1, face: '☹️', label: t.page_one_opt1 },
    { value: 2, face: '🙁', label: t.page_one_opt2 },
    { value: 3, face: '😐', label: t.page_one_opt3 },
    { value: 4, face: '🙂', label: t.page_one_opt4 },
    { value: 5, face: '😊', label: t.page_one_opt5 },
  ]

  return (
    <div className="bg-gradient-to-br p-4 md:p-8 max-w-4xl mx-auto">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl text-black font-semibold">
            {t.page_one_ques}
          </h2>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {emojis.map(({ value, face, label }) => (
              <div className="w-full text-center" key={value}>
                <button
                  type="button"
                  onClick={() => handleRatingChange(value)}
                  className={`p-2 mb-2 md:p-4 w-full text-center rounded text-xl md:text-2xl aspect-square transition-colors flex flex-col items-center justify-center gap-1 md:gap-2
                  ${
                    formData.serviceRating === value
                      ? 'bg-[#3940BD] text-white ring-2 ring-white/20'
                      : 'border text-black hover:bg-[#3940BD] hover:text-white'
                  }`}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 mx-auto flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                    >
                      {value === 1 && (
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M16 16C16 16 14.5 14 12 14C9.5 14 8 16 8 16 M8.5 9H8.51 M15.5 9H15.51"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {value === 2 && (
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M15 16C15 16 13.5 14.5 12 14.5C10.5 14.5 9 16 9 16 M8.5 9H8.51 M15.5 9H15.51"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {value === 3 && (
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M8 14H16 M8.5 9H8.51 M15.5 9H15.51"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {value === 4 && (
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14 M8.5 9H8.51 M15.5 9H15.51"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {value === 5 && (
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M7 13C7 13 9 16 12 16C15 16 17 13 17 13 M8.5 9H8.51 M15.5 9H15.51"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                  </div>
                </button>
                <span className="text-base text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-black text-lg mb-2">{t.page_three_review}</h3>
          <textarea
            value={formData.review || ''}
            onChange={e => updateFormData({ review: e.target.value })}
            className="w-full h-[120px] border-gray-300 text-black rounded p-4 resize-none border focus:border-[#3940BD] focus:ring-[#3940BD] focus:outline-none"
            placeholder={`${t.page_one_textfield}...`}
          />
        </div>

        {error && (
          <p className="text-yellow-600 text-sm">
            Please select a rating before proceeding
          </p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            type="button"
            className="text-white font-medium px-6 py-2 md:px-8 md:py-3 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border"
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  )
}
