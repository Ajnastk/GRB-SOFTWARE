import React from 'react';
import Image from 'next/image';
import Button from '../component/ui/Button';

const PricingCard = ({ plan }) => {
  return (
    <div className={`relative ${plan.bgColor} rounded-xl p-8 shadow-lg transition-all duration-300 hover:scale-105 ${plan.isPopular ? 'ring-2 ring-global-4 ring-opacity-50' : ''}`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-global-4 text-global-1 px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className={`${plan.tagBg} rounded-lg px-4 py-2 inline-block mb-6`}>
        <span className={`text-base font-kumbh font-semibold ${plan.tagText}`}>
          {plan.name}
        </span>
      </div>
      
      <p className={`text-sm font-kumbh ${plan.textColor} mb-8 leading-relaxed`}>
        {plan.description}
      </p>
      
      <div className="flex items-baseline gap-2 mb-6">
        <span className={`text-4xl lg:text-5xl font-kumbh font-bold ${plan.textColor}`}>
          {plan.price}
        </span>
        <span className={`text-lg font-kumbh ${plan.textColor} opacity-75`}>
          {plan.period}
        </span>
      </div>
      
      <hr className={`${plan.isPopular ? 'border-global-6' : 'border-global-5'} opacity-30 mb-6`} />
      
      <div className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-6 h-6 border ${plan.isPopular ? 'border-global-6' : 'border-global-3'} rounded-lg flex items-center justify-center p-1`}>
              <Image 
                src={plan.isPopular ? "/images/img_emojione_heavy_check_mark_white_a700.svg" : "/images/img_emojione_heavy_check_mark.svg"} 
                alt="Check mark" 
                width={16}
                height={16}
                className="w-full h-full"
              />
            </div>
            <span className={`text-sm font-kumbh font-medium ${plan.textColor}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>
      
      <Button
        variant="primary"
        size="lg"
        fullWidth
        className="text-sm font-kumbh font-medium rounded-lg py-3"
      >
        Choose Plan
      </Button>
    </div>
  );
};

export default PricingCard;
