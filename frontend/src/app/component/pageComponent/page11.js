'use client'

import { useState } from 'react'
import {
  Facebook,
  Twitter,
  Instagram,
  TwitterIcon as TikTok,
} from 'lucide-react'

export default function Page11({
  formData,
  updateFormData,
  onNext = () => {},
  onPrev,
}) {
  const [selectedOption, setSelectedOption] = useState(
    formData.foodQualityImprovementFrequency || null
  )
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const handleNext = () => {
    if (selectedOption) {
      updateFormData({
        foodQualityImprovementFrequency: selectedOption,
        foodQualityComment: comment,
      })
      setError('')
      if (typeof onNext === 'function') {
        onNext()
      } else {
        console.warn(
          'onNext is not a function. Navigation may not work as expected.'
        )
      }
    } else {
      setError('Please select an option before proceeding.')
    }
  }

  return (
    <div className=" ">
      <div className="relative z-10  flex flex-col">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full h-full px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="">
              {/* Right section */}
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Question */}
                  <div className="space-y-4">
                    <div className="text-white">
                      <h2 className="text-xl sm:text-2xl text-black">
                        7. How often do you notice improvements in food quality?
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'Every Three Months', value: '1' },
                        { label: '1/2 times a week', value: '2' },
                        { label: '3/4 times a week', value: '3' },
                        { label: '5/6 times a week', value: '4' },
                        { label: '7/8 times a week', value: '5' },
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
                              name="foodQualityImprovementFrequency"
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
                    <label htmlFor="comment" className="block text-black mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      id="comment"
                      className="w-full h-24 sm:h-28 border-2 rounded-lg p-3 sm:p-4 text-black text-sm sm:text-base  resize-none focus:outline-black focus:ring-2"
                      placeholder="Any additional comments about food quality improvements..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex justify-end gap-2">
                    {/* <button
                      onClick={onPrev}
                      className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-colors bg-[#3D2650] text-white hover:bg-[#4A2B5F]"
                    >
                      Previous
                    </button> */}
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
        </div>
      </div>
    </div>
  )
}
