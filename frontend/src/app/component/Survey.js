'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu } from 'lucide-react'

import Link from 'next/link'
import pageBg from '../../assets/pageOneBg.jpg'
import Page1 from './pageComponent/page1'
import Page6 from './pageComponent/page6'
import Page5 from './pageComponent/page5'
import Page8 from './pageComponent/page8'
import Page3 from './pageComponent/page3'
import Page9 from './pageComponent/page9'
import Page10 from './pageComponent/page10'
import Page11 from './pageComponent/page11'
import Page12 from './pageComponent/page12'
import Page13 from './pageComponent/page13'
import Page14 from './pageComponent/page14'
import Page15 from './pageComponent/page15'
import Page16 from './pageComponent/page16'
import { useGlobalContext } from '../context/Context'

export default function Survey() {
  const { setLanguage, language } = useGlobalContext()

  const [currentPage, setCurrentPage] = useState(2)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    age: '',
    gender: '',
    terms: false,
    satisfaction: '',
    source: [],
    recommend: '',
    recommendReason: '',
    rating_service_provided: null,
    rating_product_quality: null,
    rating_support: null,
    rating_general_satisfaction: null,
    serviceRating: null,
    review: '',
    qualityElements: [],
    badFoodFrequency: null,
    badFoodAdditionalComment: '',
    foodQualityImprovementFrequency: null,
    foodQualityComment: '',
    selectedYears: [],
    canteenService: null,
    canteenServiceReview: '',
    canteedFoodSatisfaction: null,
    canteedFoodSatisfactionReview: '',
    foodIssuesFaced: [],
    avoidBadQualityeedback: '',
    badQualityFrequency: [],
    additionalFeedback: '',
  })

  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLanguage(localStorage.getItem('erp_language') || 'en')
    }

    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle Menu"]')
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleNextPage = () => {
    if (currentPage < 13) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Final form data:', formData)
    // Add any additional submission logic here
  }

  const updateFormData = newData => {
    setFormData(prevData => ({ ...prevData, ...newData }))
  }

  const resetSurvey = () => {
    setCurrentPage(1)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      age: '',
      gender: '',
      terms: false,
      satisfaction: '',
      source: [],
      recommend: '',
      recommendReason: '',
      rating_service_provided: null,
      rating_product_quality: null,
      rating_support: null,
      rating_general_satisfaction: null,
      serviceRating: null,
      review: '',
      qualityElements: [],
      badFoodFrequency: null,
      badFoodAdditionalComment: '',
      foodQualityImprovementFrequency: null,
      foodQualityComment: '',
      selectedYears: [],
    })
  }

  console.log(formData)

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <Page1
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
          />
        )
      case 2:
        return (
          <Page6
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 3:
        return (
          <Page5
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 4:
        return (
          <Page8
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 5:
        return (
          <Page3
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={() => setCurrentPage(4)}
          />
        )
      case 6:
        return (
          <Page9
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 7:
        return (
          <Page10
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 8:
        return (
          <Page11
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 9:
        return (
          <Page12
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 10:
        return (
          <Page13
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 11:
        return (
          <Page14
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 12:
        return (
          <Page15
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )
      case 13:
        return (
          <Page16
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={handlePrevPage}
          />
        )
      default:
        return null
    }
  }

  const isFullScreenPage = currentPage === 1

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md shadow-md z-50 px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-white">LOGO</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 mt-14">
          <Link
            href="/Dashboard"
            className="block py-2 px-4 text-gray-700 text-xl bg-gray-200 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {isFullScreenPage ? (
        // Full-screen Layout for Pages 2, 4, 6, 7, 8, 9, 10, 11, 12, and 13
        <div className="min-height-screen">{renderPage()}</div>
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen pt-14">
          {/* Left Section */}
          <div
            className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col"
            style={{
              backgroundImage: `url(${pageBg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              //  make this image blur
            }}
          >
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center -mt-4 lg:-mt-10">
              {/* Image Placeholder */}
              <div className="w-full sm:w-[70%] lg:w-[55%] mx-auto aspect-[16/9] bg-gray-300 rounded-lg mb-6 sm:mb-8 lg:mb-12 flex items-center justify-center text-gray-500 text-xs sm:text-sm overflow-hidden">
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <p>Image Placeholder</p>
                </div>
              </div>

              {/* Text Content */}
              <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-normal text-white mb-4 sm:mb-6 text-center leading-tight tracking-normal">
                Food Quality Survey
              </h1>
              <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 lg:mb-10 max-w-[320px] sm:max-w-[420px] text-center leading-relaxed">
                Please fill up the form below for food quality survey
              </p>
            </div>

            {/* Footer */}
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 relative flex flex-col">
            {/* Form Container */}
            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 order-last lg:order-none">
              <div className="w-full max-w-[500px]">
                {/* Render current page */}
                {renderPage()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
