import React, { useState } from 'react'
import { X, Gift, Star, Percent, Check } from 'lucide-react'
import { RewardsAccount, RewardRedemption } from '../types'
import { rewardRedemptions } from '../data/rewardsData'

interface RewardsModalProps {
  account: RewardsAccount
  onClose: () => void
  onRedeemReward: (reward: RewardRedemption) => void
}

const RewardsModal: React.FC<RewardsModalProps> = ({ account, onClose, onRedeemReward }) => {
  const [selectedReward, setSelectedReward] = useState<RewardRedemption | null>(null)

  const getRewardIcon = (icon: string) => {
    return <span className="text-2xl">{icon}</span>
  }

  const canAfford = (reward: RewardRedemption) => {
    return account.points >= reward.pointsCost
  }

  const handleRedeem = (reward: RewardRedemption) => {
    if (canAfford(reward)) {
      onRedeemReward(reward)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rewards Store</h2>
            <p className="text-gray-600">You have <span className="font-semibold text-amber-600">{account.points} points</span> to spend</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {rewardRedemptions.map((reward) => {
              const affordable = canAfford(reward)
              
              return (
                <div
                  key={reward.id}
                  className={`border rounded-lg p-4 transition-all ${
                    affordable 
                      ? 'border-amber-200 hover:border-amber-300 hover:shadow-md cursor-pointer' 
                      : 'border-gray-200 opacity-60'
                  }`}
                  onClick={() => affordable && setSelectedReward(reward)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        {getRewardIcon(reward.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                        {reward.type === 'discount' && (
                          <p className="text-xs text-amber-600">
                            {(reward.value * 100).toFixed(0)}% off your next order
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-lg">{reward.pointsCost}</span>
                      </div>
                      {affordable ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRedeem(reward)
                          }}
                          className="mt-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                        >
                          Redeem
                        </button>
                      ) : (
                        <div className="mt-2 text-xs text-gray-500">
                          Need {reward.pointsCost - account.points} more points
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-amber-800 mb-2">How to earn more points:</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Earn 1-2 points for every $1 spent (based on your tier)</li>
              <li>• Get bonus points during special promotions</li>
              <li>• Refer friends to earn bonus points</li>
              <li>• Complete challenges for extra rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardsModal
