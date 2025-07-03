/**
 * School Dashboard Application Configuration
 * 
 * This file contains all the configurable settings for the school dashboard.
 * Modify these values to customize the application for your school.
 */

export const APP_CONFIG = {
  // Application Information
  app: {
    name: "EduDash",
    version: "1.0.0",
    description: "Modern School Management Dashboard",
    school: {
      name: "Greenwood Academy",
      address: "123 Education Street, Learning City, LC 12345",
      phone: "+1 (555) 123-4567",
      email: "admin@greenwood.edu",
      website: "https://greenwood.edu"
    }
  },

  // API Configuration
  api: {
    // Frontend will connect to this URL
    baseUrl: "http://localhost:3001",
    endpoints: {
      students: "/api/students",
      classes: "/api/classes",
      teachers: "/api/teachers"
    },
    // Request timeout in milliseconds
    timeout: 5000
  },

  // UI Configuration
  ui: {
    // Theme colors (Tailwind CSS classes)
    theme: {
      primary: "blue-600",
      secondary: "green-600", 
      accent: "orange-600",
      success: "emerald-600",
      warning: "amber-600",
      error: "red-600"
    },
    
    // Table pagination
    pagination: {
      defaultPageSize: 10,
      pageSizeOptions: [5, 10, 20, 50]
    },

    // Dashboard layout
    layout: {
      sidebarWidth: "256px",
      headerHeight: "64px"
    }
  },

  // Student form fields configuration
  studentFields: {
    required: ["firstName", "lastName", "email", "class"],
    optional: ["phone", "address", "parentName", "parentPhone"],
    
    // Field validation rules
    validation: {
      firstName: { minLength: 2, maxLength: 50 },
      lastName: { minLength: 2, maxLength: 50 },
      email: { pattern: "email" },
      phone: { pattern: "phone", optional: true },
      class: { 
        options: [
          "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
          "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
        ]
      }
    }
  },

  // Features toggle
  features: {
    enableSearch: true,
    enableFilters: true,
    enableExport: true,
    enableBulkOperations: true,
    enableNotifications: true
  }
};

export default APP_CONFIG;