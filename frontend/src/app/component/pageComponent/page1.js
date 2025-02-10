'use client'

import { useState } from 'react'
import pageBg from '../../../assets/pageOneBg.jpg'

function Page1({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName?.trim()) newErrors.firstName = 'Required'
    if (!formData.lastName?.trim()) newErrors.lastName = 'Required'
    if (!formData.email?.trim()) newErrors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format'
    if (!formData.country?.trim()) newErrors.country = 'Required'
    if (!formData.age?.trim()) newErrors.age = 'Required'
    if (!formData.gender) newErrors.gender = 'Required'
    if (!formData.terms) newErrors.terms = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      age: true,
      gender: true,
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
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-20"
      style={{
        backgroundImage: `url(${pageBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl text-white mb-4 text-center leading-tight tracking-normal font-semibold">
          Food Quality Survey
        </h1>
        <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 lg:mb-10 max-w-[320px] sm:max-w-[420px] text-center leading-relaxed mx-auto">
          Please fill up the form below for food quality survey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2.5 border bg-white bg-opacity-50 placeholder-gray-700 border-gray-200 focus:border-[#6366F1] rounded-sm focus:outline-none text-gray-800 text-[13px]"
                value={formData.firstName || ''}
                onChange={e => updateFormData({ firstName: e.target.value })}
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2.5 border bg-white bg-opacity-50 placeholder-gray-700 border-gray-200 focus:border-[#6366F1] rounded-sm focus:outline-none text-gray-800 text-[13px]"
                value={formData.lastName || ''}
                onChange={e => updateFormData({ lastName: e.target.value })}
              />
            </div>

            {/* Age */}
            <div className="relative">
              <input
                type="text"
                placeholder="Age"
                className="w-[72px] px-4 py-2.5 border bg-white bg-opacity-50 placeholder-gray-700 border-gray-200 focus:border-[#6366F1] rounded-sm focus:outline-none text-gray-800 text-[13px]"
                value={formData.age || ''}
                onChange={e => updateFormData({ age: e.target.value })}
              />
            </div>

            {/* Gender */}
            <div className="relative flex gap-6 items-center text-[13px] text-white">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="w-4 h-4 text-[#6366F1] border-gray-300"
                  checked={formData.gender === 'male'}
                  onChange={e => updateFormData({ gender: e.target.value })}
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="w-4 h-4 text-[#6366F1] border-gray-300"
                  checked={formData.gender === 'female'}
                  onChange={e => updateFormData({ gender: e.target.value })}
                />
                <span>Female</span>
              </label>
            </div>

            {/* Food Quality Improvement */}
            <div className="flex flex-col translate-y-10">
              <h1 className="text-xl font-normal text-white mb-4 text-left leading-tight tracking-normal">
                Do you think food quality needs improvement?
              </h1>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="foodQuality"
                  value="yes"
                  className="w-4 h-4 text-[#6366F1] border-gray-300"
                  checked={formData.foodQualityImprovementFrequency === 'yes'}
                  onChange={e =>
                    updateFormData({
                      foodQualityImprovementFrequency: e.target.value,
                    })
                  }
                />
                <span className="text-white">Yes</span>
                <input
                  type="radio"
                  name="foodQuality"
                  value="no"
                  className="w-4 h-4 text-[#6366F1] border-gray-300"
                  checked={formData.foodQualityImprovementFrequency === 'no'}
                  onChange={e =>
                    updateFormData({
                      foodQualityImprovementFrequency: e.target.value,
                    })
                  }
                />
                <span className="text-white">No</span>
              </div>
            </div>

            {/* Personal Preference for Food Items */}
            <div className="translate-y-14">
              <h1 className="text-xl font-normal text-white mb-4 sm:mb-6 text-left leading-tight tracking-normal">
                Do you have any personal preference for food items?
              </h1>
              <textarea
                placeholder="Type your answer here..."
                className="w-full px-4 py-2.5 border-t border-x bg-white bg-opacity-50 placeholder-gray-700 rounded-sm focus:outline-none text-gray-800 text-[13px]"
                value={formData.foodQualityComment || ''}
                onChange={e =>
                  updateFormData({ foodQualityComment: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6 mt-8 translate-y-2">
            <button
              type="submit"
              className="bg-[#3940BD] hover:bg-white hover:text-[#3940BD] text-white px-8 py-2.5 rounded-sm transition-colors w-full text-[13px]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page1
