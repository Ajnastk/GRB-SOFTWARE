import React from 'react';
import Image from 'next/image';

const TrustedCompanies = () => {
  const trustedCompanies = [
    { src: '/images/img_group.svg', alt: 'Company 1' },
    { src: '/images/img_vector.svg', alt: 'Company 2' },
    { src: '/images/img_vector_blue_gray_100.svg', alt: 'Company 3' },
    { src: '/images/img_group_gray_400.svg', alt: 'Company 4' },
    { src: '/images/img_vector.svg', alt: 'Company 5' },
    { src: '/images/img_vector_gray_400.svg', alt: 'Company 6' }
  ];

  return (
    <section className="bg-global-11 py-12 lg:py-16 mt-[150px] sm:mt-[250px] md:mt-[400px] lg:mt-[450px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl  ">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2">
            Trusted by companies like
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 lg:justify-between">
          {trustedCompanies.map((company, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image 
                src={company.src} 
                alt={company.alt} 
                width={44}
                height={46}
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-11 lg:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
