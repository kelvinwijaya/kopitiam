import React from 'react'
import { CheckCircle, Clock, MapPin, Coffee, User } from 'lucide-react'
import { CartItem } from '../types'

interface OrderSummaryProps {
  orderNumber: string
  items: CartItem[]
  total: number
  customerName: string
  onNewOrder: () => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderNumber,
  items,
  total,
  customerName,
  onNewOrder
}) => {
  const estimatedTime = Math.floor(Math.random() * 10) + 10 // 10-20 minutes

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you {customerName}! We'll have your order ready soon.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Coffee className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold">Order #{orderNumber}</h3>
            <p className="text-sm text-gray-600">Your order number</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold">{estimatedTime} minutes</h3>
            <p className="text-sm text-gray-600">Estimated time</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold">{customerName}</h3>
            <p className="text-sm text-gray-600">We'll call your name</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          {items.map((item, index) => (
            <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex justify-between items-center py-2">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
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
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Your order has been sent to our barista</li>
          <li>• We'll start preparing your beverages right away</li>
          <li>• Listen for your name - we'll call "{customerName}" when ready</li>
          <li>• Come to the counter to collect your order</li>
          <li>• Payment has been processed successfully</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={onNewOrder}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Place Another Order
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
