'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Legal Disclaimer Modal Component
 * 
 * Ensures compliance with Bar Council of India Rule 36
 * by requiring explicit acknowledgment that the website
 * is for informational purposes only and does not constitute
 * advertising or solicitation.
 */
export default function LegalDisclaimerModal() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if disclaimer should be shown
    const disclaimerAccepted = document.cookie.includes('disclaimer_accepted=true')
    const showDisclaimer = document.cookie.includes('show_disclaimer=true')
    
    if (showDisclaimer && !disclaimerAccepted) {
      setShowModal(true)
    }
  }, [])

  const handleAccept = () => {
    // Set cookie for 1 year
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    document.cookie = `disclaimer_accepted=true; path=/; expires=${expiryDate.toUTCString()}`
    
    // Remove show flag
    document.cookie = 'show_disclaimer=; path=/; max-age=0'
    
    setShowModal(false)
  }

  const handleDecline = () => {
    // Redirect to external legal information page or close tab
    window.location.href = 'about:blank'
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Legal Disclaimer
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Please read and accept the following terms before proceeding
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-96 overflow-y-auto">
          <div className="space-y-4 text-gray-700">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900">
                Important Notice - Bar Council of India Compliance
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">
                1. Not an Advertisement or Solicitation
              </h3>
              <p className="text-sm leading-relaxed">
                This website is maintained by <strong>Tandon Associates</strong> for informational 
                purposes only. In compliance with the Bar Council of India Rules, specifically 
                <strong> Rule 36 of the Bar Council of India Rules</strong>, this website is 
                <strong> NOT intended to be and shall not be construed as advertising, 
                personal communication, solicitation, invitation or inducement</strong> of any sort 
                whatsoever from us or any of our members to solicit any work through this website.
              </p>

              <h3 className="font-semibold text-lg text-gray-900 mt-4">
                2. No Legal Advice
              </h3>
              <p className="text-sm leading-relaxed">
                The information provided on this website is for general informational purposes only. 
                <strong> It does not constitute legal advice</strong> and should not be relied upon 
                as such. The content on this website may not reflect the most current legal 
                developments and may vary depending on individual circumstances.
              </p>

              <h3 className="font-semibold text-lg text-gray-900 mt-4">
                3. No Attorney-Client Relationship
              </h3>
              <p className="text-sm leading-relaxed">
                <strong>Accessing this website or using any information from it does not create 
                an attorney-client relationship</strong> between you and Tandon Associates or any 
                of its members. An attorney-client relationship can only be established through 
                a formal engagement letter or retainer agreement.
              </p>

              <h3 className="font-semibold text-lg text-gray-900 mt-4">
                4. User Responsibility
              </h3>
              <p className="text-sm leading-relaxed">
                By proceeding further, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>You are accessing this website at your own initiative and not due to any 
                    advertisement, solicitation or inducement from us</li>
                <li>You understand that any information obtained from this website is for your 
                    personal knowledge and understanding only</li>
                <li>You will not construe any information on this website as legal advice or 
                    as a substitute for obtaining independent legal counsel</li>
                <li>You will seek appropriate independent legal advice for your specific 
                    circumstances before taking any action</li>
              </ul>

              <h3 className="font-semibold text-lg text-gray-900 mt-4">
                5. Confidentiality Warning
              </h3>
              <p className="text-sm leading-relaxed">
                <strong>Do not send us any confidential information</strong> through this website 
                until an attorney-client relationship has been established. Any unsolicited 
                information sent to us will not be treated as confidential.
              </p>

              <h3 className="font-semibold text-lg text-gray-900 mt-4">
                6. Jurisdiction
              </h3>
              <p className="text-sm leading-relaxed">
                This website is governed by the laws of India. Use of this website from other 
                jurisdictions is at the user's own risk and responsibility.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-sm font-medium text-blue-900">
                📌 By clicking "I Accept and Agree", you confirm that you have read, understood, 
                and agree to be bound by the above terms and conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 bg-gray-50">
          <button
            onClick={handleDecline}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium shadow-md"
          >
            I Accept and Agree
          </button>
        </div>
      </div>
    </div>
  )
}
