import React, { useState } from 'react'
import { Coffee, ShoppingCart, User, MapPin, Clock, Star } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Cart from './components/Cart'
import TableSelection from './components/TableSelection'
import OrderSummary from './components/OrderSummary'
import { CartItem, MenuItem, CustomizationOptions } from './types'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'cart' | 'table' | 'summary'>('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const addToCart = (item: MenuItem, customizations: CustomizationOptions, finalPrice: number) => {
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id === item.id && 
      JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
    )

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += 1
      setCart(updatedCart)
    } else {
      const newCartItem: CartItem = {
        ...item,
        quantity: 1,
        customizations,
        finalPrice
      }
      setCart([...cart, newCartItem])
    }
  }

  const updateCartItem = (id: string, customizations: CustomizationOptions, quantity: number) => {
    if (quantity === 0) {
      removeCartItem(id, customizations)
    } else {
      setCart(cart.map(item =>
        item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const removeCartItem = (id: string, customizations: CustomizationOptions) => {
    setCart(cart.filter(item => 
      !(item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations))
    ))
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setCurrentView('summary')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={() => setCurrentView('cart')}
        onHomeClick={() => setCurrentView('home')}
        onMenuClick={() => setCurrentView('menu')}
      />
      
      {currentView === 'home' && (
        <>
          <Hero onOrderNow={() => setCurrentView('menu')} />
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Traditional Nanyang</h3>
                <p className="text-gray-600">Authentic coffee shop beverages with full customization</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Table Service</h3>
                <p className="text-gray-600">Order from your table with our QR code system</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
                <p className="text-gray-600">Fast preparation and delivery to your table</p>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'menu' && (
        <Menu 
          onAddToCart={addToCart}
          onProceedToTable={() => setCurrentView('table')}
          cartItemCount={getTotalItems()}
        />
      )}

      {currentView === 'cart' && (
        <Cart 
          items={cart}
          onUpdateItem={updateCartItem}
          onRemoveItem={removeCartItem}
          onProceedToTable={() => setCurrentView('table')}
          onBackToMenu={() => setCurrentView('menu')}
          total={getTotalPrice()}
        />
      )}

      {currentView === 'table' && (
        <TableSelection 
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
          onProceedToPayment={handlePlaceOrder}
          onBackToCart={() => setCurrentView('cart')}
          cartTotal={getTotalPrice()}
          cartItemCount={getTotalItems()}
        />
      )}

      {currentView === 'summary' && (
        <OrderSummary 
          orderNumber={Math.floor(Math.random() * 1000) + 1}
          items={cart}
          total={getTotalPrice()}
          tableNumber={selectedTable}
          onNewOrder={() => {
            setCart([])
            setSelectedTable(null)
            setOrderPlaced(false)
            setCurrentView('home')
          }}
        />
      )}
    </div>
  )
}

export default App
