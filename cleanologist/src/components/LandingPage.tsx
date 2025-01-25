import React from 'react';

import { Button } from "@/components/ui/button"

interface ServiceProps {
  title: string;
  description: string;
  id: string;
}

const LandingPage: React.FC = () => {
  const services: ServiceProps[] = [
    {
      title: 'House Cleaning',
      description: 'Professional home cleaning services tailored to your needs',
      id: 'house-cleaning'
    },
    {
      title: 'Home Improvements',
      description: 'Expert renovations and repairs to enhance your living space',
      id: 'home-improvements'
    },
    {
      title: 'Deep Cleaning',
      description: 'Thorough deep cleaning services for a spotless environment',
      id: 'deep-cleaning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-fresh-green">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Transform Your Space with Professional Cleaning Services
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Expert cleaning and home improvement services tailored to your needs
              </p>
              <Button size="lg" className="bg-white text-charcoal hover:bg-white/90">
                Work With Us
              </Button>
            </div>
            <div className="hidden lg:block">
              {/* Placeholder for hero image */}
              <div className="relative">
                <img 
                  src="/cleaning.jpeg" 
                  alt="Cleaning service illustration" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                id={service.id}
                className="bg-warm-beige p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-charcoal mb-2">
                  {service.title}
                </h3>
                <p className="text-charcoal">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 Cleanologist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;