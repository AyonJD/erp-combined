'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SuccessPopup5 from '../popupModal/SuccessPopup5'
import SuccessPopup4 from '../popupModal/SuccessPopup4'
import SuccessPopup2 from '../popupModal/SuccessPopup2'
import SuccessPopup1 from '../popupModal/SuccessPopup1'

function Page16({ formData, updateFormData, onSubmit }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentPopup, setCurrentPopup] = useState(0)
  const router = useRouter()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'Required'
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Required'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.country?.trim()) {
      newErrors.country = 'Required'
    }

    if (!formData.age?.trim()) {
      newErrors.age = 'Required'
    }

    if (!formData.gender) {
      newErrors.gender = 'Required'
    }

    if (!formData.feedback?.trim()) {
      newErrors.feedback = 'Required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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
    onSubmit(formData)
    setIsPopupOpen(true)
    setCurrentPopup(0)
    // } else {
    //   console.log('Form is invalid. Please check the errors.');
    // }
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
    validateForm()
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

  const handleNextPopup = () => {
    if (currentPopup < 3) {
      setCurrentPopup(currentPopup + 1)
    } else {
      setIsPopupOpen(false)
      // router.push('/Dashboard') // Replace with your desired redirect path
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">
          12. Do you have any additional feedback for us?
        </h2>

        <div className="space-y-4">
          <div className="relative">
            {renderErrorBadge('feedback')}
            <textarea
              placeholder="Your Feedback"
              className={`w-full px-4 py-2.5 border border-gray-300 ${
                touched.feedback && errors.feedback
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:border-[#6366F1]'
              } rounded-sm focus:outline-none text-gray-800 text-[13px] resize-none`}
              value={formData.feedback || ''}
              onChange={e => updateFormData({ feedback: e.target.value })}
              onBlur={() => handleBlur('feedback')}
              rows="4"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <button
            type="submit"
            className=" text-white font-medium px-8 py-2 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]"
          >
            Submit
          </button>
        </div>
      </form>

      <SuccessPopup5
        isOpen={isPopupOpen && currentPopup === 0}
        onClose={handleNextPopup}
        onRedirect={handleNextPopup}
      />
      <SuccessPopup4
        isOpen={isPopupOpen && currentPopup === 1}
        onClose={handleNextPopup}
        onRedirect={handleNextPopup}
      />
      <SuccessPopup2
        isOpen={isPopupOpen && currentPopup === 2}
        onClose={handleNextPopup}
        onRedirect={handleNextPopup}
      />
      <SuccessPopup1
        isOpen={isPopupOpen && currentPopup === 3}
        onClose={handleNextPopup}
        onRedirect={handleNextPopup}
      />
    </>
  )
}

export default Page16
