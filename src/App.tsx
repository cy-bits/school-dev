import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Plus, Settings, BookOpen } from 'lucide-react';
import { APP_CONFIG } from '../config/app.config.js';
import StudentDashboard from './components/StudentDashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [currentView, setCurrentView] = useState('students');
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server status on mount
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch(`${APP_CONFIG.api.baseUrl}/api/health`);
        if (response.ok) {
          setServerStatus('connected');
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        setServerStatus('disconnected');
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const navigation = [
    { id: 'students', name: 'Students', icon: Users },
    { id: 'classes', name: 'Classes', icon: BookOpen },
    { id: 'teachers', name: 'Teachers', icon: GraduationCap },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'students':
        return <StudentDashboard serverStatus={serverStatus} />;
      case 'classes':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Classes Management</h3>
              <p className="text-gray-500">This feature is coming soon. Currently focused on student management.</p>
            </div>
          </div>
        );
      case 'teachers':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Teachers Management</h3>
              <p className="text-gray-500">This feature is coming soon. Currently focused on student management.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-500">Configuration options will be available here.</p>
            </div>
          </div>
        );
      default:
        return <StudentDashboard serverStatus={serverStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        navigation={navigation} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header serverStatus={serverStatus} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;