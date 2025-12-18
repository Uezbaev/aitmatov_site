import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center md:hidden ml-2">
              <span className="text-green-700 font-semibold text-xl">AgroAnalytics</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-3xl mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10 pr-4 py-2 w-full"
                placeholder="Search regions, crops, or metrics..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600">
              <Bell size={20} />
            </button>
            
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            
            <div className="flex items-center">
              <button className="flex items-center space-x-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600">
                <div className="bg-green-100 text-green-800 rounded-full p-1">
                  <User size={20} />
                </div>
                <span className="hidden md:inline-block text-sm font-medium">Аккаунт</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;