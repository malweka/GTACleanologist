import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
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

  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-fresh-green">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-charcoal">
              Cleanologist
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>What We Do</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {services.map((service) => (
                          <li key={service.id}>
                            <NavigationMenuLink asChild>
                              <button
                                onClick={() => scrollToService(service.id)}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-light-blue hover:text-charcoal focus:bg-light-blue focus:text-charcoal w-full text-left"
                              >
                                <div className="text-sm font-medium leading-none">{service.title}</div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {service.description}
                                </p>
                              </button>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <a href="/contact" className="text-charcoal hover:text-fresh-green transition-colors">
                Contact
              </a>
              
              <Button className="bg-fresh-green hover:bg-fresh-green/90 text-white">
                Work With Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

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
                  src="/api/placeholder/600/400" 
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