import React from 'react';
import { Button } from '@/components/ui/button';

const DeepCleaning: React.FC = () => {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-charcoal mb-6">Deep Cleaning Services</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal/80 mb-8">
              Experience the difference with our thorough deep cleaning services. 
              We tackle those hard-to-reach areas and stubborn dirt for a truly immaculate space.
            </p>

            <div className="bg-light-blue/20 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Deep Cleaning Services Include:</h2>
              <ul className="space-y-4">
                <li>Behind and under furniture cleaning</li>
                <li>Deep carpet and upholstery cleaning</li>
                <li>Baseboard and wall cleaning</li>
                <li>Air vent cleaning</li>
                <li>Cabinet interior cleaning</li>
                <li>Appliance deep cleaning</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-beige p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Move-In/Move-Out</h3>
                <p>Comprehensive deep cleaning for property transitions.</p>
              </div>
              <div className="bg-warm-beige p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Spring Cleaning</h3>
                <p>Annual deep cleaning service to refresh your entire living space.</p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-fresh-green text-white hover:bg-fresh-green/90">
                Book Deep Cleaning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepCleaning;