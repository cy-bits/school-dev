import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import SERVER_CONFIG from './config/server.config.js';

// ES modules setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = SERVER_CONFIG.server.port;

// Middleware
app.use(cors(SERVER_CONFIG.cors));
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = join(__dirname, 'data');
const studentsFile = join(dataDir, 'students.json');

try {
  await fs.mkdir(dataDir, { recursive: true });
} catch (error) {
  console.log('Data directory exists or created');
}

// Initialize students data file
async function initializeDataFile() {
  try {
    await fs.access(studentsFile);
  } catch {
    // File doesn't exist, create it with sample data
    const sampleStudents = [
      {
        id: uuidv4(),
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+1-234-567-8901",
        class: "Class 10",
        address: "123 Main St, City, State",
        parentName: "Jane Doe",
        parentPhone: "+1-234-567-8902",
        enrollmentDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@email.com",
        phone: "+1-234-567-8903",
        class: "Class 9",
        address: "456 Oak Ave, City, State",
        parentName: "Bob Smith",
        parentPhone: "+1-234-567-8904",
        enrollmentDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    await fs.writeFile(studentsFile, JSON.stringify(sampleStudents, null, 2));
    console.log('✅ Sample data created');
  }
}

// Helper functions for data operations
async function readStudents() {
  try {
    const data = await fs.readFile(studentsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading students:', error);
    return [];
  }
}

async function writeStudents(students) {
  try {
    await fs.writeFile(studentsFile, JSON.stringify(students, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing students:', error);
    return false;
  }
}

// API Routes

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await readStudents();
    res.json({
      success: true,
      data: students,
      total: students.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: error.message
    });
  }
});

// Get student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const students = await readStudents();
    const student = students.find(s => s.id === req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
      error: error.message
    });
  }
});

// Create new student
app.post('/api/students', async (req, res) => {
  try {
    const students = await readStudents();
    const newStudent = {
      id: uuidv4(),
      ...req.body,
      enrollmentDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    students.push(newStudent);
    const success = await writeStudents(students);
    
    if (!success) {
      throw new Error('Failed to save student');
    }
    
    res.status(201).json({
      success: true,
      data: newStudent,
      message: 'Student created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message
    });
  }
});

// Update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const students = await readStudents();
    const studentIndex = students.findIndex(s => s.id === req.params.id);
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    students[studentIndex] = {
      ...students[studentIndex],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    const success = await writeStudents(students);
    
    if (!success) {
      throw new Error('Failed to update student');
    }
    
    res.json({
      success: true,
      data: students[studentIndex],
      message: 'Student updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const students = await readStudents();
    const studentIndex = students.findIndex(s => s.id === req.params.id);
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    const deletedStudent = students.splice(studentIndex, 1)[0];
    const success = await writeStudents(students);
    
    if (!success) {
      throw new Error('Failed to delete student');
    }
    
    res.json({
      success: true,
      data: deletedStudent,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
async function startServer() {
  await initializeDataFile();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 School Dashboard API is ready!`);
    console.log(`📁 Data stored in: ${studentsFile}`);
  });
}

startServer().catch(console.error);