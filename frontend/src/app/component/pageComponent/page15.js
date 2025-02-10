'use client'

import { useState } from 'react'

function Page15({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      country: true,
      age: true,
      gender: true,
      feedback: true,
    })

    // if (validateForm()) {
    //   console.log('Form is valid. Submitting...');
    //   onNext();
    // } else {
    //   console.log('Form is invalid. Please check the errors.');
    // }
    onNext()
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const renderErrorBadge = field => {
    if (touched[field] && errors[field]) {
      return (
        <span className="absolute right-0 top-0 -translate-y-1/2 bg-red-500 text-white text-[13px] px-3 py-1 rounded">
          Required
        </span>
      )
    }
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        11. Do you have any additional feedback for us?
      </h2>

      <div className="space-y-4">
        <div className="relative">
          {renderErrorBadge('additionalFeedback')}
          <textarea
            placeholder="Your Feedback"
            className={`w-full px-4 py-2.5 border border-gray-300 ${
              touched.feedback && errors.feedback
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 focus:border-[#6366F1]'
            } rounded-sm focus:outline-none text-gray-800 text-[13px] resize-none`}
            value={formData.additionalFeedback || ''}
            onChange={e =>
              updateFormData({ additionalFeedback: e.target.value })
            }
            onBlur={() => handleBlur('additionalFeedback')}
            rows="4"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <button
          type="submit"
          className=" text-white font-medium px-8 py-2 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]"
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default Page15
