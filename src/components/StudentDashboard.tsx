import React, { useState, useEffect } from 'react';
import { Plus, Users, UserCheck, UserX, Wifi, WifiOff } from 'lucide-react';
import { apiService } from '../config/api.config.js';
import { APP_CONFIG } from '../../config/app.config.js';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import Stats from './Stats';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  class: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  enrollmentDate: string;
  createdAt: string;
  updatedAt: string;
}

interface StudentDashboardProps {
  serverStatus: 'checking' | 'connected' | 'disconnected' | 'error';
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ serverStatus }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load students data
  const loadStudents = async () => {
    if (serverStatus !== 'connected') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getStudents();
      setStudents(response.data || []);
    } catch (err) {
      setError('Failed to load students. Please check if the server is running.');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [serverStatus]);

  // Handle create student
  const handleCreateStudent = async (studentData: Omit<Student, 'id' | 'enrollmentDate' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await apiService.createStudent(studentData);
      setStudents(prev => [...prev, response.data]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create student');
      console.error('Error creating student:', err);
    }
  };

  // Handle update student
  const handleUpdateStudent = async (id: string, studentData: Partial<Student>) => {
    try {
      const response = await apiService.updateStudent(id, studentData);
      setStudents(prev => prev.map(s => s.id === id ? response.data : s));
      setEditingStudent(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to update student');
      console.error('Error updating student:', err);
    }
  };

  // Handle delete student
  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await apiService.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete student');
      console.error('Error deleting student:', err);
    }
  };

  // Handle edit student
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Calculate stats
  const stats = {
    total: students.length,
    active: students.length, // For now, all students are considered active
    graduated: 0, // Placeholder for future feature
    classes: [...new Set(students.map(s => s.class))].length
  };

  // Server disconnected state
  if (serverStatus === 'disconnected' || serverStatus === 'error') {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <WifiOff className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Server Connection Failed</h3>
          <p className="text-red-700 mb-4">
            Unable to connect to the backend server. Please make sure the server is running.
          </p>
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-left">
            <p className="text-sm text-red-800 font-medium mb-2">To start the server:</p>
            <code className="text-xs bg-red-200 px-2 py-1 rounded">
              cd server && npm install && npm run dev
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowForm(true);
          }}
          disabled={serverStatus !== 'connected'}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Stats */}
      <Stats stats={stats} />

      {/* Student Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onSubmit={editingStudent ? 
            (data) => handleUpdateStudent(editingStudent.id, data) : 
            handleCreateStudent
          }
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
        />
      )}

      {/* Student List */}
      <StudentList
        students={students}
        loading={loading}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentDashboard;