'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';

import Link from 'next/link';
import { Envelope, Phone, MapPin, TwitterLogo, LinkedinLogo, InstagramLogo, GithubLogo } from '@phosphor-icons/react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/20 bg-[#0b0740] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg luxury-heading mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Use Cases', href: '#use-cases' },
                { name: 'About Us', href: '#about' },
                { name: 'Contact', href: '#contact' },
                { name: 'Privacy Policy', href: '#privacy' },
                { name: 'Terms of Service', href: '#terms' }
              ].map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="luxury-text hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg luxury-heading mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                'Features',
                'How it Works',
                'Integrations',
                'Security'
              ].map((item, index) => (
                <li key={item} className="luxury-text hover:text-accent-400 transition-colors duration-200 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg luxury-heading mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Envelope size={16} className="text-accent-400" />
                <span className="luxury-text">support@grbsoftware.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-accent-400" />
                <span className="luxury-text">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent-400" />
                <span className="luxury-text">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg luxury-heading mb-4">Newsletter</h4>
            <p className="luxury-text mb-6 leading-relaxed">
              Stay updated with GRB Software news and tips
            </p>
            <Link href="/admin/login">
            <Button className="w-full">
              Get Started
            </Button>
            </Link>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: TwitterLogo, href: '#', label: 'Twitter' },
                { icon: LinkedinLogo, href: '#', label: 'LinkedIn' },
                { icon: InstagramLogo, href: '#', label: 'Instagram' },
                { icon: GithubLogo, href: '#', label: 'GitHub' }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:text-accent-400 hover:bg-white/20 transition-all duration-200"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="luxury-text text-sm">
              © {currentYear} GRB Software. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
