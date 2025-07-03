import React from 'react';
import { Bell, Search, Wifi, WifiOff, AlertCircle } from 'lucide-react';

interface HeaderProps {
  serverStatus: 'checking' | 'connected' | 'disconnected' | 'error';
}

const Header: React.FC<HeaderProps> = ({ serverStatus }) => {
  const getStatusIcon = () => {
    switch (serverStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'connected':
        return 'Server Connected';
      case 'disconnected':
        return 'Server Disconnected';
      case 'error':
        return 'Server Error';
      default:
        return 'Checking Server...';
    }
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">School Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Server Status */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-50 border">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;