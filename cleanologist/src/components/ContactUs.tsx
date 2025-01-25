import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactUsRequest } from '../services/types';
import ApiService from '../services/ApiService';

const ContactUs: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactUsRequest>();
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const onSubmit = async (data: ContactUsRequest) => {
    setSubmitting(true);
    try {
      const response = await ApiService.getInstance().submitContactForm(data);
      if (response.message) {
        setSubmitStatus({
          type: 'success',
          message: response.message
        });
        reset(); // Clear form
      } else if (response.error) {
        setSubmitStatus({
          type: 'error',
          message: response.error
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-charcoal mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  {...register('contact_name', { required: 'Name is required' })}
                  className={errors.contact_name ? 'border-red-500' : ''}
                />
                {errors.contact_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_name.message}</p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...register('contact_email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={errors.contact_email ? 'border-red-500' : ''}
                />
                {errors.contact_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_email.message}</p>
                )}
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  {...register('contact_telephone', { required: 'Phone number is required' })}
                  className={errors.contact_telephone ? 'border-red-500' : ''}
                />
                {errors.contact_telephone && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_telephone.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  {...register('message', { required: 'Message is required' })}
                  className={`min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {submitStatus.message && (
                <div className={`p-4 rounded-md ${
                  submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-fresh-green hover:bg-fresh-green/90 text-white"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-light-blue rounded-lg shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-semibold text-charcoal mb-6">Contact Information</h2>
            
            <div className="space-y-6 flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Address</h3>
                <address className="not-italic text-charcoal/80">
                  Cleanologist<br />
                  123 Cleaning Way<br />
                  St. Elsewhere, NE
                </address>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Contact Details</h3>
                <div className="space-y-2 text-charcoal/80">
                  <p>
                    <span className="font-medium">Tel:</span> 1.123.777-8888
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    <a 
                      href="mailto:contact@cleanologist.com" 
                      className="text-fresh-green hover:underline"
                    >
                      contact@cleanologist.com
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Business Hours</h3>
                <div className="space-y-1 text-charcoal/80">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;