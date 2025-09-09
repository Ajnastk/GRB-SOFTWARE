import React from 'react';
import Image from 'next/image';

const TestimonialSection = () => {
  return (
    <section className="bg-global-11 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2 mb-6">
              Transform your review strategy with intelligent QR filtering.
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-kumbh text-global-3 mb-12 leading-relaxed">
              GRB Software helps businesses automatically direct satisfied customers to Google Reviews while handling concerns privately. Our smart system has helped thousands of businesses improve their online reputation without the stress of negative public reviews.
            </p>
            <div className="flex items-center gap-6 lg:gap-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-global-8 rounded-full flex items-center justify-center flex-shrink-0">
                <Image 
                  src="/images/img_gg_profile.svg" 
                  alt="Profile" 
                  width={30}
                  height={30}
                  className="w-6 h-6 lg:w-8 lg:h-8"
                />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2">
                   80,000+
                </h3>
                <p className="text-sm lg:text-base font-kumbh text-global-4 mt-2">
                  Positive reviews generated through our platform
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative">
              <Image 
                src="/images/img_woman_hand_holding.png" 
                alt="Woman holding phone" 
                width={622}
                height={622}
                className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] xl:w-[622px] xl:h-[622px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
