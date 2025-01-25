import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ContactUsRequest, CreateAppointmentRequest, ApiResponse } from './types';

class ApiService {
  private api: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Sends a contact form submission
   * @param contactData The contact form data
   * @returns Promise with the response
   */
  public async submitContactForm(contactData: ContactUsRequest): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.api.post('/contact-us', contactData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse;
      }
      throw new Error('An error occurred while submitting the contact form');
    }
  }

  /**
   * Creates a new service appointment
   * @param appointmentData The appointment and contact data
   * @returns Promise with the response
   */
  public async createAppointment(appointmentData: CreateAppointmentRequest): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.api.post('/contacts', appointmentData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse;
      }
      throw new Error('An error occurred while creating the appointment');
    }
  }
}

export default ApiService;