import React from 'react';
import Image from 'next/image';
import Header from '../component/common/Header';
import Button from '../component/ui/Button';
import Link from 'next/link';

const WellnessHeroSection = () => {
  return (
    <section className="relative bg-global-2 z-10 ">
      <div className="container mx-auto h-[95vh]  px-4 sm:px-6 lg:px-8 max-w-7xl ">
        <div className="py-6 sm:py-8 lg:py-12">
          <Header />
          
          {/* Top consultation button */}
          <div className="flex justify-center mt-8 md:mt-12">
            <Link href="/admin/login">
            <Button
              variant="secondary"
              size="sm"
              className="bg-button-2 text-global-5 font-karla font-bold px-6 py-3 rounded-full"
            >
             Get Your Free Demo Now
            </Button>
            </Link>
          </div>
          
          {/* Hero Title - Centered */}
          <div className="text-center mt-4 space-y-4">
            <h1 className="text-4xl sm:text-[32px] mx-auto md:text-[48px] font-komba font-bold text-global-6 max-w-3xl leading-tight">
           Transform negative reviews into business growth with GRB
            </h1>
            <p className="text-lg  text-[16px] font-karla text-global-6 max-w-2xl mx-auto opacity-90 leading-relaxed">
              GRB Software is a smart QR-based review management solution that filters 
negative reviews, directs satisfied customers to Google Reviews, and 
builds your business reputation automatically.
            </p>
            {/* Get Started Button */}
            <div className="mt-8">
                <Link href="/admin/login">
              <Button
                variant="primary"
                size="lg"
                className="px-8 py-4 font-karla font-bold rounded-full text-lg"
              >
               Get Started

              </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements - Same positions as original */}
          <div className="absolute top-20 right-8 sm:top-32 sm:right-12 lg:top-40 lg:right-16">
            <Image 
              src="/images/img_group_13.svg" 
              alt="Decorative element" 
              width={66}
              height={76}
              className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
            />
          </div>
          
          <div className="absolute top-1/2 left-8 sm:left-12 lg:left-16 transform -translate-y-1/2">
            <Image 
              src="/images/img_group_14.svg" 
              alt="Decorative element" 
              width={46}
              height={50}
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12"
            />
          </div>
        </div>
        
         {/* Dashboard Image - Same positioning as Kanban board */}
        <div className="flex justify-center mt-[100px] sm:mt-[90px] md:mt-0 pb-8 ">
          <div className="relative  z-100">
            <Image 
              src="/images/adminPanel.png" 
              alt=" dashboard interface showing meditation tracking, nutrition plans, fitness goals, and wellness metrics" 
              width={931}
              height={572}
              className="rounded-xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessHeroSection;
