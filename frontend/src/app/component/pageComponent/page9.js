'use client'

import { useState } from 'react'

export default function Page9({ formData, updateFormData, onNext, onPrev }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')

  const handleNext = () => {
    if (selectedOption) {
      updateFormData({
        canteedFoodSatisfaction: selectedOption,
        canteedFoodSatisfactionReview: review,
      })
      setError('')
      onNext()
    } else {
      setError('Please select an option before proceeding.')
    }
  }

  return (
    <div className=" ">
      {/* Circular gradient overlays */}

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Right section */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            {/* Question */}
            <div className="space-y-4">
              <div className="text-black">
                <h2 className="text-xl sm:text-2xl  lg:mb-8">
                  5. Are you often unsatisfied with canteen food & service?
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Yes', value: '1' },
                  { label: 'Sometimes', value: '0.5' },
                  { label: 'No', value: '0' },
                ].map(option => (
                  <label
                    key={option.label}
                    className={`flex items-center p-3 sm:p-3.5 rounded-lg cursor-pointer transition-all  
                            ${
                              selectedOption === option.value
                                ? 'bg-[#3940BD] border-2 border-white'
                                : 'border-2 '
                            } hover:opacity-90`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption === option.value
                          ? 'border-white'
                          : 'border-black'
                      } flex items-center justify-center
                              ${
                                selectedOption === option.value
                                  ? 'bg-white'
                                  : 'bg-transparent'
                              }`}
                    >
                      <input
                        type="radio"
                        name="canteedFoodSatisfaction"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={() => setSelectedOption(option.value)}
                        className="hidden"
                      />
                      {selectedOption === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#3940BD]" />
                      )}
                    </div>
                    <span
                      className={`text-base sm:text-lg ml-3 ${
                        selectedOption === option.value
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review" className="block text-black mb-2">
                Your Review
              </label>
              <textarea
                id="review"
                className="w-full h-24 sm:h-28 border-2 rounded-lg p-3 sm:p-4 text-black text-sm sm:text-base  resize-none focus:outline-black focus:ring-2"
                placeholder="Write your review here..."
                value={review}
                onChange={e => setReview(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className=" text-white font-medium px-8 py-2 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]"
                disabled={!selectedOption}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
