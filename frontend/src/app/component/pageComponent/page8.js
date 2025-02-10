'use client'

import React, { useState } from 'react'

export default function Page8({ formData, updateFormData, onNext, onPrev }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')

  const handleNext = () => {
    if (selectedOption) {
      updateFormData({
        canteenService: selectedOption,
        canteenServiceReview: review,
      })
      setError('')
      onNext()
    } else {
      setError('Please select an option before proceeding.')
    }
  }

  return (
    <div className="">
      <div className="">
        {/* Header */}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full h-full px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="">
              {/* Left section */}

              {/* Right section */}
              <div className="">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-black">
                      <h2 className="text-xl sm:text-2xl lg:mb-8">
                        3. Do you think the canteen provides consistently good
                        service?
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
                          className={`flex items-center p-2 sm:p-2.5 rounded-lg cursor-pointer transition-all  
                            ${
                              selectedOption === option.value
                                ? 'bg-[#3940BD] border-2 border-white'
                                : 'border-2 '
                            } hover:opacity-90`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
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
                              name="canteenService"
                              value={option.value}
                              checked={selectedOption === option.value}
                              onChange={() => setSelectedOption(option.value)}
                              className="hidden"
                            />

                            {selectedOption === option.value && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#3940BD] " />
                            )}
                          </div>

                          <span
                            className={`text-black text-base ml-3 ${
                              selectedOption === option.value
                                ? 'text-white'
                                : ''
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
                      className="w-full h-24 border-2 rounded-lg p-3 sm:p-4 text-black text-sm sm:text-base  resize-none focus:outline-black focus:ring-2"
                      placeholder="Write your review here..."
                      value={review}
                      onChange={e => setReview(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className={`px-6 sm:px-8 py-2 sm:py-2.5 rounded-sm text-sm sm:text-base font-semibold transition-colors
                        ${
                          selectedOption
                            ? 'bg-[#3940BD] text-white hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                      disabled={!selectedOption}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
