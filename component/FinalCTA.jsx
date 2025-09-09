import React from 'react';
import Image from 'next/image';
import Button from '../component/ui/Button';
import Link from 'next/link';

const FinalCTA = () => {
  return (
    <section className="bg-global-11 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative flex justify-center lg:justify-start">
              <Image 
                src="/images/img_image_2.png" 
                alt="Task management interface" 
                width={580}
                height={580}
                className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] xl:w-[580px] xl:h-[580px] object-cover rounded-xl"
              />
            </div>
          </div>
          
          <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2 mb-8 lg:mb-12 leading-tight">
             Ready to boost your Google Reviews?
            </h2><div
            className="text-lg sm:text-xl lg:text-2xl font-kumbh text-global-3 mb-12 lg:mb-16 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >

                <p className='mb-10' >
              Take control of your online reputation with GRB Software's smart QR system. Start filtering negative reviews and directing satisfied customers to Google Reviews automatically.
            </p>
            <p>Our intelligent platform helps thousands of Indian businesses maintain excellent online ratings while handling customer concerns professionally and privately.</p>
            </div>

            <Link href="/admin/login">
            <Button
              variant="primary"
              size="lg"
              className="px-8 py-3 font-kumbh font-medium rounded-lg"
            >
            Get Started Today
            </Button>
            </Link>
            {/* Arrow Decoration */}
      <div className=" relative flex justify-center md:-right-25 -right-25 sm:-right-25 lg:right-20">
        <Image 
          src="/images/img_hand_drawn_arrow.svg" 
          alt="Hand drawn arrow" 
          width={152}
          height={74}
          className="w-16 h-8 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-38 lg:h-18"
        />
      </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
