import React from 'react';
import Image from 'next/image';
import Button from '../component/ui/Button';

const CustomerTestimonial = () => {
  return (
    <section className="bg-global-11 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2 leading-tight">
             Success stories from our customers
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-xl lg:text-2xl font-kumbh text-global-3 leading-relaxed">
             Real businesses seeing real results with GRB Software's intelligent review management system.
            </p>
          </div>
        </div>
        
        <div className="relative bg-global-1 rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 lg:p-16">
            <div className="lg:col-span-7">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image 
                  src="/images/img_rectangle_7.png" 
                  alt="Customer testimonial" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="bg-global-11 rounded-lg px-4 py-2 inline-block mb-6">
                <span className="text-base font-kumbh font-semibold text-global-1">
                 Professional 
                </span>
                
              </div>
              <div className="flex items-baseline gap-2 mb-10 justify-center lg:justify-start">
                <span className="text-4xl lg:text-5xl font-kumbh font-bold text-global-6">
                  ₹5,000
                </span>
                <span className="text-lg font-kumbh text-global-6 opacity-75">
                  /Month
                </span>
              </div>
              <p className="text-sm lg:text-base font-kumbh text-global-6 mb-6 opacity-90">
                "GRB Software transformed how we handle customer feedback. Our Google rating went from 3.2 to 4.7 stars in just 3 months. The smart filtering ensures only happy customers leave public reviews while we can address concerns privately."
              </p>
              <p>- Rajesh Kumar, Restaurant Owner, Mumbai</p>
              <Button
                variant="primary"
                size="lg"
                className="w-full lg:w-auto px-8 py-3 mt-10 font-kumbh font-medium rounded-lg"
              >
                Choose
              </Button>
            </div>
          </div>
          
          {/* Background Image */}
          <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-20">
            <Image 
              src="/images/img_rectangle_6.png" 
              alt="Background decoration" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonial;
