'use client'

import { useState } from 'react'

export default function Page6({ formData, updateFormData, onNext, onPrev }) {
  const [error, setError] = useState(false)

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
    { value: 1, face: '☹️', label: 'Very Bad' },
    { value: 2, face: '🙁', label: '' },
    { value: 3, face: '😐', label: '' },
    { value: 4, face: '🙂', label: '' },
    { value: 5, face: '😊', label: 'Excellent' },
  ]

  return (
    <div className=" bg-gradient-to-br p-4">
      {/* Top Bar */}

      <div className=" ">
        {/* Right Section */}
        <div className="">
          <div>
            <div className="flex justify-between items-center mb-2">
              {/* <span className="text-white/70 bg-[#353BAF] px-4 py-1 rounded text-sm">6 of 7</span> */}
              <h2 className="text-2xl text-black">
                1. How satisfied are you with the food this week?
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-3">
                {emojis.map(({ value, face }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRatingChange(value)}
                    className={`p-4 text-center rounded text-2xl aspect-square transition-colors flex flex-col items-center justify-center gap-2
                      ${
                        formData.serviceRating === value
                          ? 'bg-[#3940BD] text-white ring-2 ring-white/20'
                          : ' border text-black hover:bg-[#3940BD] hover:text-white'
                      }`}
                  >
                    <div className="w-8 h-8 mx-auto flex items-center justify-center">
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
                    {/* <span className="text-lg font-medium">{value}</span> */}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-white/70 text-sm px-1">
                <span>Very Bad</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white text-lg">Your Review</h3>
            <textarea
              value={formData.review || ''}
              onChange={e => updateFormData({ review: e.target.value })}
              className="w-full h-[120px] border-gray-500 text-black rounded p-4 resize-none border-[1px] focus:border-[#3940BD] focus:ring-none focus:outline-none"
              placeholder="Write your review here..."
            />
          </div>

          {error && (
            <p className="text-yellow-400 text-sm">
              Please select a rating before proceeding
            </p>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              type="button"
              className=" text-white font-medium px-8 py-2 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
