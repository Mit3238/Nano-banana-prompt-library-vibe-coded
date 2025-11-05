import React from 'react';
import type { AppView } from '../types';
import { Tabs } from './Tabs';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z"></path><path d="M3 7l9 5 9-5"></path><path d="M12 22V12"></path></svg>
        <span className="text-xl font-bold text-gray-900">AI Image Studio</span>
    </div>
);

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const tabs: { id: AppView, label: string }[] = [
    { id: 'edit', label: 'Edit Image' },
    { id: 'generate', label: 'Generate Image' },
    { id: 'analyze', label: 'Analyze Image' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20 py-4 sm:py-0">
        <Logo />
        <div className="mt-4 sm:mt-0 w-full sm:w-auto">
            <Tabs tabs={tabs} activeTab={activeView} onTabClick={(tabId) => setActiveView(tabId as AppView)} />
        </div>
      </div>
    </header>
  );
};