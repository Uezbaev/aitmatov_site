import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MapPin, PieChart, Sprout, BarChart2, 
  CloudRain, Settings, HelpCircle, X, Leaf
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive 
        ? 'bg-green-100 text-green-800' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 h-screen bg-white border-r border-gray-200 z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'left-0' : '-left-64'}
        md:left-0 w-64 
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Leaf size={24} className="text-green-700" />
              <span className="text-green-700 font-semibold text-xl">Opmaida</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <NavLink to="/" className={navLinkClass} end>
              <PieChart size={20} />
              <span>Панель управления</span>
            </NavLink>
            
            <NavLink to="/map" className={navLinkClass}>
              <MapPin size={20} />
              <span>Просмотр карты</span>
            </NavLink>
            
            <NavLink to="/crops" className={navLinkClass}>
              <Sprout size={20} />
              <span>Аналитика урожая</span>
            </NavLink>
            
            <NavLink to="/regions" className={navLinkClass}>
              <BarChart2 size={20} />
              <span>Сравнение регионов</span>
            </NavLink>
            
            <NavLink to="/weather" className={navLinkClass}>
              <CloudRain size={20} />
              <span>Прогноз погоды</span>
            </NavLink>
          </nav>
          
          <div className="p-4 border-t border-gray-200 space-y-1">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200">
              <Settings size={20} />
              <span>Настройки</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200">
              <HelpCircle size={20} />
              <span>Помощь</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;