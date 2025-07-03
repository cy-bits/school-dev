# School Dashboard - MERN Application

A modern, beginner-friendly school management dashboard built with the MERN stack (MongoDB, Express, React, Node.js). This application allows you to manage student records with full CRUD operations.

## 🎯 Features

- **Student Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Live connection status with the backend
- **Search & Filter**: Find students quickly with search and class filters
- **Form Validation**: Comprehensive form validation with error handling
- **Configuration-based**: All settings managed through config files

## 📁 Project Structure

```
school-dashboard/
├── config/                 # Configuration files
│   └── app.config.js       # Frontend configuration
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── server.config.js
│   ├── data/
│   │   └── students.json   # Data storage (JSON file)
│   ├── package.json
│   └── server.js           # Main server file
├── src/                    # Frontend (React)
│   ├── components/         # React components
│   ├── config/
│   │   └── api.config.js   # API service configuration
│   └── App.tsx             # Main React app
├── package.json            # Frontend dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your system (version 14 or higher).

### Installation & Setup

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Start the Development Servers**

   **Option 1: Start both servers with one command**
   ```bash
   npm run dev:full
   ```

   **Option 2: Start servers separately**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔧 Configuration

### Frontend Configuration (`config/app.config.js`)

This file contains all frontend settings:

- **App Information**: Name, version, school details
- **API Settings**: Backend URL, endpoints, timeout
- **UI Configuration**: Theme colors, pagination, layout
- **Student Fields**: Form fields, validation rules
- **Features**: Enable/disable specific features

### Backend Configuration (`server/config/server.config.js`)

This file contains all backend settings:

- **Server Settings**: Port, host, environment
- **CORS Settings**: Allowed origins, methods, headers
- **Database Settings**: Data storage configuration
- **API Settings**: Endpoints, rate limiting
- **Logging**: Log levels and output

## 📊 Understanding the Architecture

### Frontend (React)
- **App.tsx**: Main application component with routing logic
- **Components**: Modular React components for different features
- **API Service**: Centralized API calls to the backend
- **Configuration**: Settings and customization options

### Backend (Node.js/Express)
- **Server.js**: Main server file with API routes
- **Data Storage**: JSON file for development (easily replaceable with database)
- **CORS**: Cross-origin resource sharing for frontend-backend communication
- **Error Handling**: Comprehensive error responses

### Data Flow
1. User interacts with React frontend
2. Frontend makes API calls to Express backend
3. Backend processes requests and updates JSON data
4. Backend sends response back to frontend
5. Frontend updates UI with new data

## 🛠 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/health` | Server health check |

## 📝 Student Data Structure

```javascript
{
  "id": "unique-uuid",
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@email.com",
  "phone": "+1-234-567-8901",
  "class": "Class 10",
  "address": "123 Main St, City, State",
  "parentName": "Jane Doe",
  "parentPhone": "+1-234-567-8902",
  "enrollmentDate": "2024-01-15",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🎨 Customization

### Adding New Student Fields

1. **Update Configuration** (`config/app.config.js`):
   ```javascript
   studentFields: {
     required: ["firstName", "lastName", "email", "class", "newField"],
     validation: {
       newField: { minLength: 2, maxLength: 50 }
     }
   }
   ```

2. **Update Form Component** (`src/components/StudentForm.tsx`):
   - Add field to form state
   - Add input field to JSX
   - Update validation logic

3. **Update List Component** (`src/components/StudentList.tsx`):
   - Add column to table if needed
   - Update display logic

### Changing Theme Colors

Update the theme configuration in `config/app.config.js`:

```javascript
ui: {
  theme: {
    primary: "your-color-600",
    secondary: "your-color-600",
    // ... other colors
  }
}
```

## 🔍 Troubleshooting

### Server Connection Issues

1. **Check if backend is running**:
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Verify port availability**: Make sure ports 3001 (backend) and 5173 (frontend) are not in use

3. **Check console logs**: Look for error messages in both frontend and backend terminals

### Data Not Saving

1. **Check file permissions**: Ensure the server can write to the `server/data/` directory
2. **Verify JSON format**: Check if `students.json` is valid JSON
3. **Review server logs**: Look for database write errors

## 🚀 Next Steps

### Database Integration

To use a real database instead of JSON files:

1. **Install database driver** (e.g., MongoDB):
   ```bash
   cd server
   npm install mongodb mongoose
   ```

2. **Update server configuration** to use database connection
3. **Replace file operations** with database queries in `server.js`

### Production Deployment

1. **Build frontend**:
   ```bash
   npm run build
   ```

2. **Configure environment variables** for production
3. **Use process manager** like PM2 for the backend
4. **Set up reverse proxy** with Nginx

## 📚 Learning Resources

- **React**: https://reactjs.org/docs/
- **Express.js**: https://expressjs.com/
- **Node.js**: https://nodejs.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🤝 Contributing

This is a beginner-friendly project! Feel free to:
- Add new features
- Improve the UI/UX
- Fix bugs
- Add documentation
- Suggest improvements

## 📄 License

This project is open source and available under the MIT License.