import React from 'react'
import { ArrowLeft, ArrowRight, Users } from 'lucide-react'

interface TableSelectionProps {
  selectedTable: number | null
  onSelectTable: (tableNumber: number) => void
  onProceedToPayment: () => void
  onBackToCart: () => void
  cartTotal: number
  cartItemCount: number
}

const TableSelection: React.FC<TableSelectionProps> = ({
  selectedTable,
  onSelectTable,
  onProceedToPayment,
  onBackToCart,
  cartTotal,
  cartItemCount
}) => {
  const tables = [
    { number: 1, seats: 2, available: true },
    { number: 2, seats: 4, available: true },
    { number: 3, seats: 2, available: false },
    { number: 4, seats: 6, available: true },
    { number: 5, seats: 4, available: true },
    { number: 6, seats: 2, available: true },
    { number: 7, seats: 8, available: true },
    { number: 8, seats: 4, available: false },
    { number: 9, seats: 2, available: true },
    { number: 10, seats: 4, available: true },
    { number: 11, seats: 6, available: true },
    { number: 12, seats: 2, available: true }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Select Your Table</h1>
        <button
          onClick={onBackToCart}
          className="text-amber-600 hover:text-amber-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Coffee Shop Layout</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map(table => (
            <button
              key={table.number}
              onClick={() => table.available && onSelectTable(table.number)}
              disabled={!table.available}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTable === table.number
                  ? 'border-amber-600 bg-amber-50'
                  : table.available
                  ? 'border-gray-200 hover:border-amber-300 bg-white'
                  : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-2">Table {table.number}</div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {table.seats} seats
                </div>
                <div className={`text-xs mt-2 ${table.available ? 'text-green-600' : 'text-red-600'}`}>
                  {table.available ? 'Available' : 'Occupied'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between items-center mb-2">
          <span>Items:</span>
          <span>{cartItemCount}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Total:</span>
          <span className="text-xl font-bold text-amber-600">${cartTotal.toFixed(2)}</span>
        </div>
        {selectedTable && (
          <div className="flex justify-between items-center mb-4 p-3 bg-amber-50 rounded-lg">
            <span>Selected Table:</span>
            <span className="font-semibold">Table {selectedTable}</span>
          </div>
        )}
        <button
          onClick={onProceedToPayment}
          disabled={!selectedTable}
          className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center ${
            selectedTable
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Proceed to Payment
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default TableSelection
