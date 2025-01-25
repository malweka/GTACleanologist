import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

interface ServiceLink {
  title: string;
  description: string;
  path: string;
}

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  
  const services: ServiceLink[] = [
    {
      title: 'House Cleaning',
      description: 'Professional home cleaning services tailored to your needs',
      path: '/services/house-cleaning'
    },
    {
      title: 'Home Improvements',
      description: 'Expert renovations and repairs to enhance your living space',
      path: '/services/home-improvements'
    },
    {
      title: 'Deep Cleaning',
      description: 'Thorough deep cleaning services for a spotless environment',
      path: '/services/deep-cleaning'
    }
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-charcoal">
            Cleanologist
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>What We Do</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {services.map((service) => (
                        <li key={service.path}>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => navigate(service.path)}
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
            
            <Link to="/contact" className="text-charcoal hover:text-fresh-green transition-colors">
              Contact
            </Link>
            
            <Button className="bg-fresh-green hover:bg-fresh-green/90 text-white">
              Work With Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;