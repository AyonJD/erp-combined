'use client'

import { useGlobalContext } from '@/app/context/Context'
import { useState } from 'react'

export default function Page9({ formData, updateFormData, onNext, onPrev }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const { t } = useGlobalContext()

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

      <div className="relative z-10 flex flex-col">
        {/* Right section */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            {/* Question */}
            <div className="space-y-4">
              <div className="text-black">
                <h2 className="text-xl sm:text-2xl  lg:mb-8">
                  {t.page_five_ques}
                </h2>
              </div>

              <div className="space-y-2">
                {[
                  { label: t.page_three_op1, value: '1' },
                  { label: t.page_three_op2, value: '0.5' },
                  { label: t.page_three_op3, value: '0' },
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
                      className={`text-base ml-3 ${
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
                {t.page_three_review}
              </label>
              <textarea
                id="review"
                className="w-full h-24 sm:h-28 border-2 rounded-lg p-3 sm:p-4 text-black text-sm sm:text-base  resize-none focus:outline-black focus:ring-2"
                placeholder={`${t.page_one_textfield}...`}
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
                {t.next}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
