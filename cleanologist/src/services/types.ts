export interface ContactUsRequest {
    contact_name: string;
    contact_email: string;
    contact_telephone: string;
    message: string;
  }
  
  export interface CreateAppointmentRequest {
    service_requested: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    appointment_date_time: string;
    service_notes?: string;
  }
  
  export interface ApiResponse {
    message?: string;
    error?: string;
  }