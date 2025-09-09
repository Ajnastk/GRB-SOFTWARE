'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Footer from '../../component/common/Footer';
import HeroSection from '../../component/HeroSection';
import TrustedCompanies from '../../component/TrustedCompanies';
import TaskManagement from '../../component/HowitWork';
import TestimonialSection from '../../component/TestimonialSection';
import PricingSection from '../../component/PricingSection';
import CustomerTestimonial from '../../component/CustomerTestimonial';
import FinalCTA from '../../component/FinalCTA';

const Home = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  return (
    <div className="min-h-screen bg-global-11">
      <HeroSection />
      <TrustedCompanies />
      <TaskManagement 
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
      />
      <TestimonialSection />
      <PricingSection />
      <CustomerTestimonial />
      <FinalCTA />
      
      
      <Footer />
    </div>
  );
};

export default Home;
