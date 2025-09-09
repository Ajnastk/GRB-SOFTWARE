import React from 'react';
import PricingCard from './PricingCard';

const PricingSection = () => {
  const pricingPlans = [
  {
    name: 'Starter',
    price: '₹2,500',
    period: '/month',
    description:
      'Perfect for small businesses starting their reputation management journey',
    features: [
      '1 Business Location',
      'Up to 100 QR scans per month',
      'Basic review filtering',
      'Email support',
      'QR code generation',
      'basic analytics dashboard'
    ],
    isPopular: false,
    bgColor: 'bg-global-11',
    textColor: 'text-global-2',
    tagBg: 'bg-global-9',
    tagText: 'text-global-1',
  },
  {
    name: 'Professional',
    price: '₹5,000',
    period: '/month',
    description:
      'Ideal for growing businesses with multiple locations',
    features: [
      'Up to 5 business locations',
      'Up to 1,000 QR scans per month',
      'Advanced analytics dashboard',
      'Priority support',
      'Custom QR designs',
      'Automated response templates',
    ],
    isPopular: true, // Most Popular
    bgColor: 'bg-global-1',
    textColor: 'text-global-6',
    tagBg: 'bg-global-4',
    tagText: 'text-global-1',
  },
  {
    name: 'Enterprise',
    price: '₹10,000',
    period: '/month',
    description:
      'For large businesses and franchises needing full control',
    features: [
      'Unlimited business locations',
      'Unlimited QR scans',
      'White-label solution',
      '24/7 phone support',
      'Custom integrations',
      'Dedicated account manager',
    ],
    isPopular: false,
    bgColor: 'bg-global-11',
    textColor: 'text-global-2',
    tagBg: 'bg-global-9',
    tagText: 'text-global-1',
  },
];

  return (
    <section className="bg-global-11 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2 mb-6">
            Pick up the best plan
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-kumbh text-global-3 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect GRB Software plan to boost your Google Reviews and protect your business reputation with smart QR filtering technology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
