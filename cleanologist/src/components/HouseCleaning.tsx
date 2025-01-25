import React from 'react';
import { Button } from '@/components/ui/button';

const HouseCleaning: React.FC = () => {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-charcoal mb-6">House Cleaning Services</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal/80 mb-8">
              Transform your living space with our professional house cleaning services. 
              We provide comprehensive cleaning solutions tailored to your specific needs.
            </p>

            <div className="bg-light-blue/20 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our House Cleaning Services Include:</h2>
              <ul className="space-y-4">
                <li>Regular cleaning maintenance</li>
                <li>Kitchen and bathroom deep cleaning</li>
                <li>Floor care and maintenance</li>
                <li>Dusting and surface cleaning</li>
                <li>Window cleaning</li>
                <li>Customized cleaning plans</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-beige p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Regular Cleaning</h3>
                <p>Scheduled cleaning services to maintain a consistently clean home environment.</p>
              </div>
              <div className="bg-warm-beige p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">One-Time Deep Clean</h3>
                <p>Intensive cleaning service for those special occasions or seasonal cleaning needs.</p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-fresh-green text-white hover:bg-fresh-green/90">
                Schedule a Cleaning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCleaning;