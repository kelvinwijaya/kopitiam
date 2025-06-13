import React, { useState, useEffect } from 'react'
import { Coffee, ShoppingCart, User, MapPin, Clock, Star } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import CustomerWelcome from './components/CustomerWelcome'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderSummary from './components/OrderSummary'
import PromotionBanner from './components/PromotionBanner'
import RewardsCard from './components/RewardsCard'
import RewardsModal from './components/RewardsModal'
import { CartItem, MenuItem, CustomizationOptions, RewardsAccount, RewardRedemption, Promotion } from './types'
import { calculateTier, calculatePointsEarned, activePromotions } from './data/rewardsData'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'welcome' | 'menu' | 'cart' | 'checkout' | 'summary'>('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState<string>('')
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showRewardsModal, setShowRewardsModal] = useState(false)
  const [appliedPromotion, setAppliedPromotion] = useState<Promotion | null>(null)
  const [appliedReward, setAppliedReward] = useState<RewardRedemption | null>(null)

  // Initialize rewards account
  const [rewardsAccount, setRewardsAccount] = useState<RewardsAccount>({
    customerName: '',
    points: 125,
    totalSpent: 45.80,
    visits: 12,
    tier: 'Bronze',
    joinDate: '2024-01-15'
  })

  // Update rewards account when customer name changes
  useEffect(() => {
    if (customerName) {
      setRewardsAccount(prev => ({
        ...prev,
        customerName,
        tier: calculateTier(prev.totalSpent)
      }))
    }
  }, [customerName])

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
  
  const getTotalPrice = () => {
    let total = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)
    
    // Apply promotion discount
    if (appliedPromotion && appliedPromotion.type === 'discount') {
      if (!appliedPromotion.minSpend || total >= appliedPromotion.minSpend) {
        total = total * (1 - appliedPromotion.value)
      }
    }
    
    // Apply reward discount
    if (appliedReward && appliedReward.type === 'discount') {
      total = total * (1 - appliedReward.value)
    }
    
    return total
  }

  const handleCustomerNameSubmit = (name: string) => {
    setCustomerName(name)
    setCurrentView('menu')
  }

  const handlePaymentSuccess = () => {
    const orderNum = `LK${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    
    // Calculate and award points
    const originalTotal = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)
    const isDoublePoints = appliedPromotion?.type === 'points' && appliedPromotion.value === 2
    const pointsEarned = calculatePointsEarned(originalTotal, rewardsAccount.tier, isDoublePoints)
    
    // Update rewards account
    setRewardsAccount(prev => ({
      ...prev,
      points: prev.points + pointsEarned - (appliedReward?.pointsCost || 0),
      totalSpent: prev.totalSpent + originalTotal,
      visits: prev.visits + 1,
      tier: calculateTier(prev.totalSpent + originalTotal)
    }))
    
    // Reset applied rewards/promotions
    setAppliedPromotion(null)
    setAppliedReward(null)
    
    setCurrentView('summary')
  }

  const handleNewOrder = () => {
    setCart([])
    setCustomerName('')
    setOrderNumber('')
    setOrderPlaced(false)
    setAppliedPromotion(null)
    setAppliedReward(null)
    setCurrentView('home')
  }

  const handlePromotionSelect = (promotion: Promotion) => {
    setAppliedPromotion(promotion)
  }

  const handleRedeemReward = (reward: RewardRedemption) => {
    if (rewardsAccount.points >= reward.pointsCost) {
      setAppliedReward(reward)
      setShowRewardsModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PromotionBanner onPromotionSelect={handlePromotionSelect} />
      
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={() => setCurrentView('cart')}
        onHomeClick={() => setCurrentView('home')}
        onMenuClick={() => setCurrentView('menu')}
        customerName={customerName}
      />
      
      {currentView === 'home' && (
        <>
          <Hero onOrderNow={() => setCurrentView('welcome')} />
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
                  <User className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Service</h3>
                <p className="text-gray-600">We'll know your name and prepare your order with care</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
                <p className="text-gray-600">Fast preparation and we'll call your name when ready</p>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'welcome' && (
        <CustomerWelcome 
          onNameSubmit={handleCustomerNameSubmit}
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'menu' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {customerName && (
            <div className="mb-6">
              <RewardsCard 
                account={rewardsAccount}
                onViewRewards={() => setShowRewardsModal(true)}
              />
            </div>
          )}
          
          {(appliedPromotion || appliedReward) && (
            <div className="mb-6 space-y-2">
              {appliedPromotion && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">🎉</span>
                    <span className="text-green-800 font-medium">
                      {appliedPromotion.title} Applied!
                    </span>
                  </div>
                  <button
                    onClick={() => setAppliedPromotion(null)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Remove
                  </button>
                </div>
              )}
              
              {appliedReward && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-600">{appliedReward.icon}</span>
                    <span className="text-amber-800 font-medium">
                      {appliedReward.name} Applied!
                    </span>
                  </div>
                  <button
                    onClick={() => setAppliedReward(null)}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}
          
          <Menu 
            onAddToCart={addToCart}
            onProceedToCart={() => setCurrentView('cart')}
            cartItemCount={getTotalItems()}
            customerName={customerName}
          />
        </div>
      )}

      {currentView === 'cart' && (
        <Cart 
          items={cart}
          onUpdateItem={updateCartItem}
          onRemoveItem={removeCartItem}
          onProceedToCheckout={() => setCurrentView('checkout')}
          onBackToMenu={() => setCurrentView('menu')}
          total={getTotalPrice()}
          customerName={customerName}
        />
      )}

      {currentView === 'checkout' && (
        <Checkout 
          items={cart}
          total={getTotalPrice()}
          customerName={customerName}
          onPaymentSuccess={handlePaymentSuccess}
          onBackToCart={() => setCurrentView('cart')}
        />
      )}

      {currentView === 'summary' && (
        <OrderSummary 
          orderNumber={orderNumber}
          items={cart}
          total={getTotalPrice()}
          customerName={customerName}
          onNewOrder={handleNewOrder}
        />
      )}

      {showRewardsModal && (
        <RewardsModal
          account={rewardsAccount}
          onClose={() => setShowRewardsModal(false)}
          onRedeemReward={handleRedeemReward}
        />
      )}
    </div>
  )
}

export default App
