import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick, className = '' }) => {
  return (
    <div className={`flex space-x-1 bg-gray-200 rounded-lg p-1 ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100
            ${activeTab === tab.id
              ? 'bg-cyan-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-300 hover:text-gray-800'
            }`}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};