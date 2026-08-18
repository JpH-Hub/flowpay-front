import { useState } from 'react'
import { Toaster } from 'sonner'
import Sidebar from './components/layout/Sidebar.jsx'
import VisaoGeral from './views/VisaoGeral.jsx'
import AbrirChamado from './views/AbrirChamado.jsx'
import FecharChamado from './views/FecharChamado.jsx'
import { useDashboard } from './hooks/useDashboard.js' 

export default function App() {
  const [activeTab, setActiveTab] = useState('visao-geral')
  
  const { dashboardData, isLoading, isError, refreshDashboard } = useDashboard()

  return (
    <div className="flex h-screen w-full bg-white">
      <Toaster position="top-right" richColors />

      {activeTab === 'visao-geral' && (
        <VisaoGeral 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          dashboardData={dashboardData} 
          isLoading={isLoading}  
          isError={isError} 
          onRetry={refreshDashboard}      
        />
      )}

      {activeTab === 'abrir-chamado' && (
        <div className="flex h-screen w-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <AbrirChamado refreshDashboard={refreshDashboard} />
        </div>
      )}

      {activeTab === 'fechar-chamado' && (
        <div className="flex h-screen w-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <FecharChamado refreshDashboard={refreshDashboard} />
        </div>
      )}
    </div>
  )
}