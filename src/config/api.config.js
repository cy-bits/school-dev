/**
 * Frontend API Configuration
 * 
 * This file manages all API calls to the backend server.
 * Modify the baseURL if your server runs on a different port.
 */

import { APP_CONFIG } from '../../config/app.config.js';

const API_BASE_URL = APP_CONFIG.api.baseUrl;

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.timeout = APP_CONFIG.api.timeout;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Students API methods
  async getStudents() {
    return this.request('/api/students');
  }

  async getStudent(id) {
    return this.request(`/api/students/${id}`);
  }

  async createStudent(studentData) {
    return this.request('/api/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(id, studentData) {
    return this.request(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  }

  async deleteStudent(id) {
    return this.request(`/api/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }
}

export const apiService = new ApiService();
export default apiService;