import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Coffee, Heart } from 'lucide-react'

interface CustomerWelcomeProps {
  onNameSubmit: (name: string) => void
  onBack: () => void
}

const CustomerWelcome: React.FC<CustomerWelcomeProps> = ({ onNameSubmit, onBack }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNameSubmit(name.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to LimKopi!</h1>
            <p className="text-gray-600 text-lg">How can we address you?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center text-lg"
                autoFocus
                required
              />
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={!name.trim()}
                className={`w-full py-3 rounded-lg transition-all flex items-center justify-center text-lg font-medium ${
                  name.trim()
                    ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Let's Start Ordering
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500 mr-1" />
              We're excited to serve you today!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerWelcome
