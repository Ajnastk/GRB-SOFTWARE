'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Stories', href: '#Stories' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Company', href: '#company' }
  ];

  return (
    <header className="w-full">
      <div className="w-full max-w-[1142px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <img 
              src="/images/img_group_12_1.png" 
              alt="Taskilla Logo" 
              className="w-[49px] h-[13px] sm:w-[74px] sm:h-[20px] md:w-[98px] md:h-[26px]"
            /> */}
            <h1 className='font-extrabold text-2xl '>GRB</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[29px] xl:gap-[58px]">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className="text-xs font-karla font-normal leading-[15px] text-center capitalize text-global-6 hover:text-blue-300 transition-colors duration-200"
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
        <Link href="/admin/login">
          <button 
            className="block lg:hidden p-2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-global-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          </Link>

          {/* Login Button - Desktop */}
          <div className="hidden lg:block">
             <Link href="/admin/login">
             <Button
              variant="primary"
              size="sm"
              className="px-[14px] py-[4px] sm:px-[21px] sm:py-[6px] md:px-[28px] md:py-[8px] text-xs font-karla font-bold leading-[15px] text-center capitalize rounded-[8px] sm:rounded-[12px] md:rounded-[16px]"
            >
              Login
            </Button></Link>
            
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:hidden pb-4`}>
          <div className="flex flex-col gap-4">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className="text-left text-sm font-karla font-normal text-global-6 hover:text-blue-300 transition-colors duration-200 py-2"
              >
                {item?.label}
              </button>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                className="text-xs font-karla font-bold leading-[15px] text-center capitalize rounded-[16px]"
              >
                Login
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;