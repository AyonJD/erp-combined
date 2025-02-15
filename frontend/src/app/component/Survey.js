'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu } from 'lucide-react'

import Link from 'next/link'
import pageBg from '../../assets/loginbg.jpg'
import logo from '../../assets/logo.png'
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
import { getMe } from '@/backend/auth/auth'
import { useRouter } from 'next/navigation'
import { submitFeedback } from '@/backend/feedback'
import Image from 'next/image'

export default function Survey() {
  const { setLanguage, t, loggedInUser, setLoggedInUser } = useGlobalContext()

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(2)
  const [formData, setFormData] = useState({
    // satisfaction: '',
    // recommend: '',
    // recommendReason: '',
    // rating_service_provided: null,
    // rating_product_quality: null,
    // rating_support: null,
    // rating_general_satisfaction: null,
    // qualityElements: [],
    // selectedYears: [],
    // avoidBadQualityeedback: '',
    // terms: false,

    // page 1----> 6
    serviceRating: null,
    review: '',

    // page 2----> 5
    rating_service_quality: null,
    rating_meal_planning: null,
    rating_food_taste: null,
    rating_dine_in_environment_hygiene: null,
    rating_cooking_quality: null,

    // page 3---> 8
    canteenService: null,
    canteenServiceReview: '',

    // page 4----> 3
    source: [],

    // page 5----> 9
    canteedFoodSatisfaction: null,
    canteedFoodSatisfactionReview: '',

    // page 6----> 10
    badFoodFrequency: null,
    badFoodAdditionalComment: '',

    // page 7----> 11
    foodQualityImprovementFrequency: null,
    foodQualityComment: '',

    // page 8----> 12
    foodIssuesFaced: [],

    // page 9----> 13
    avoidBadQualityFeedback: '',

    // page 10----> 14
    badQualityFrequency: [],

    // page 11----> 15
    additionalFeedback: '',

    // page 12----> 16
    feedback: '',

    // 21
  })
  console.log(formData)
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('erp_authtoken')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const response = await getMe(token)
        console.log(response, 'me')
        if (response?.status_code === 200) {
          setLoggedInUser(response.data)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Error validating user:', error)
        router.push('/login')
      }
    }

    if (typeof window !== 'undefined') {
      setLanguage(localStorage.getItem('erp_language') || 'en')
      checkAuth()
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
      // if (currentPage === 7) {
      //   setCurrentPage(currentPage + 2)
      // } else {
      //   setCurrentPage(currentPage + 1)
      // }
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmit = async () => {
    // Add any additional submission logic here
    const res = await submitFeedback({ ...formData, userId: loggedInUser._id })
    console.log(res, 'res-------')
    if (res.status_code === 201) {
      resetSurvey()
    }
  }

  const updateFormData = newData => {
    setFormData(prevData => ({ ...prevData, ...newData }))
  }

  const resetSurvey = () => {
    setInterval(() => {
      setCurrentPage(2)
      setFormData({
        serviceRating: null,
        review: '',

        // page 2----> 5
        rating_service_quality: null,
        rating_meal_planning: null,
        rating_food_taste: null,
        rating_dine_in_environment_hygiene: null,
        rating_cooking_quality: null,

        // page 3---> 8
        canteenService: null,
        canteenServiceReview: '',

        // page 4----> 3
        source: [],

        // page 5----> 9
        canteedFoodSatisfaction: null,
        canteedFoodSatisfactionReview: '',

        // page 6----> 10
        badFoodFrequency: null,
        badFoodAdditionalComment: '',

        // page 7----> 11
        foodQualityImprovementFrequency: null,
        foodQualityComment: '',

        // page 8----> 12
        foodIssuesFaced: [],

        // page 9----> 13
        avoidBadQualityFeedback: '',

        // page 10----> 14
        badQualityFrequency: [],

        // page 11----> 15
        additionalFeedback: '',

        // page 12----> 16
        feedback: '',
      })
    }, 5000)
  }

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
      <nav className="fixed top-0 left-0 right-0 bg-[#4A2219] backdrop-blur-md shadow-md z-50 px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Food Quality Survey</div>
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
            className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${pageBg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              //  make this image blur
            }}
          >
            <div className="backdrop-blur-md bg-black/40 p-4 rounded-xl shadow-2xl">
              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Image Placeholder */}
                {/* <div className="w-full sm:w-[70%] lg:w-[55%] mx-auto aspect-[16/9] bg-gray-300 rounded-lg mb-6 sm:mb-8 lg:mb-12 flex items-center justify-center text-gray-500 text-xs sm:text-sm overflow-hidden">
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <p>Image Placeholder</p>
                </div>
              </div> */}

                <div className="mb-6">
                  <Image src={logo.src} width={120} height={120} alt="" />
                </div>

                {/* Text Content */}
                <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-normal text-white mb-4 text-center leading-tight tracking-normal">
                  {t.food_quality_survey}
                </h1>
                <p className="text-white/80 text-sm sm:text-base max-w-[320px] sm:max-w-[420px] text-center leading-relaxed">
                  {t.please_fill_the_form}
                </p>
              </div>
            </div>

            {/* Footer */}
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 relative flex flex-col">
            {/* Form Container */}
            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 order-last lg:order-none">
              <div className="w-full max-w-[800px]">
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
