'use client'

import { useGlobalContext } from '@/app/context/Context'
import { useState } from 'react'

function Page13({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const { t } = useGlobalContext()

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

    if (!formData.terms) {
      newErrors.terms = 'Required'
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
      terms: true,
    })

    // if (validateForm()) {
    onNext()
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        {t.page_nine_ques}
      </h2>

      <div className="space-y-4">
        <div className="relative">
          {renderErrorBadge('avoidBadQualityFeedback')}
          <textarea
            placeholder={`${t.page_nine_comment}`}
            className={`w-full px-4 py-2.5 border border-gray-300 ${
              touched.feedback && errors.feedback
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 focus:border-[#6366F1]'
            } rounded-sm focus:outline-none text-gray-800 text-[13px] resize-none`}
            value={formData.avoidBadQualityFeedback || ''}
            onChange={e =>
              updateFormData({ avoidBadQualityFeedback: e.target.value })
            }
            onBlur={() => handleBlur('avoidBadQualityFeedback')}
            rows="4"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <button
          type="submit"
          className=" text-white font-medium px-8 py-2 rounded transition-colors bg-[#3940BD] hover:bg-white hover:text-[#3940BD] hover:border hover:border-[#3940BD] border-transparent border-[1px]"
        >
          {t.next}
        </button>
      </div>
    </form>
  )
}

export default Page13
