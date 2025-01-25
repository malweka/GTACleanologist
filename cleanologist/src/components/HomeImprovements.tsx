import React from 'react';
import { Button } from '@/components/ui/button';

const HomeImprovements: React.FC = () => {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-charcoal mb-6">Home Improvement Services</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal/80 mb-8">
              Enhance your living space with our professional home improvement services. 
              From minor repairs to major renovations, we've got you covered.
            </p>

            <div className="bg-light-blue/20 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Home Improvement Services Include:</h2>
              <ul className="space-y-4">
                <li>Interior painting and wallpapering</li>
                <li>Minor plumbing repairs</li>
                <li>Electrical fixes and installations</li>
                <li>Cabinet repairs and updates</li>
                <li>Door and window repairs</li>
                <li>General handyman services</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-beige p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Small Repairs</h3>
                <p>Quick fixes and minor repairs to keep your home in perfect condition.</p>
              </div>
              <div className="bg-warm-beige p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Major Renovations</h3>
                <p>Comprehensive renovation services for larger home improvement projects.</p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-fresh-green text-white hover:bg-fresh-green/90">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeImprovements;