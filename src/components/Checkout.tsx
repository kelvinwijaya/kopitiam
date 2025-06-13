import React, { useState } from 'react'
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react'
import { CartItem } from '../types'

interface CheckoutProps {
  items: CartItem[]
  total: number
  customerName: string
  onPaymentSuccess: () => void
  onBackToCart: () => void
}

const Checkout: React.FC<CheckoutProps> = ({
  items,
  total,
  customerName,
  onPaymentSuccess,
  onBackToCart
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess()
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <button
          onClick={onBackToCart}
          className="text-amber-600 hover:text-amber-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4 p-3 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>Customer:</strong> {customerName}
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            {items.map((item, index) => (
              <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  {/* Show customizations */}
                  <div className="text-xs text-gray-500 mt-1">
                    {item.customizations.cupSize !== 'regular' && (
                      <span className="mr-2">Large Cup</span>
                    )}
                    {item.customizations.temperature === 'cold' && (
                      <span className="mr-2">Cold</span>
                    )}
                    {item.customizations.sugarLevel !== 'normal' && (
                      <span className="mr-2">
                        {item.customizations.sugarLevel === 'kosong' ? 'No Sugar' :
                         item.customizations.sugarLevel === 'katai' ? 'Less Sweet' :
                         item.customizations.sugarLevel === 'siutai' ? 'Extra Sweet' :
                         'Double Extra Sweet'}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-semibold">${(item.finalPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-600" />
            Secure Payment
          </h2>

          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Credit Card</div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'cash'
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="w-5 h-5 mx-auto mb-1 text-lg">💵</div>
                <div className="text-sm font-medium">Pay at Counter</div>
              </button>
            </div>
          </div>

          <form onSubmit={handlePayment}>
            {paymentMethod === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  Your order will be prepared and you can pay at the counter when you collect it.
                  We'll call your name when it's ready!
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full mt-6 py-4 rounded-lg font-medium text-lg transition-all ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl'
              } text-white flex items-center justify-center`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {paymentMethod === 'card' ? `Pay $${total.toFixed(2)}` : 'Place Order'}
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-500">
            <Lock className="w-3 h-3 inline mr-1" />
            Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
