import React, { useState } from 'react';
import { Header } from './components/Header';
import { GenerateView } from './components/views/GenerateView';
import { EditView } from './components/views/EditView';
import { AnalyzeView } from './components/views/AnalyzeView';
import type { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('edit');

  const renderView = () => {
    switch (activeView) {
      case 'generate':
        return <GenerateView />;
      case 'edit':
        return <EditView />;
      case 'analyze':
        return <AnalyzeView />;
      default:
        return <EditView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;