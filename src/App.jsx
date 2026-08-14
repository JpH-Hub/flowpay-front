import { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
import Sidebar from './components/layout/Sidebar.jsx'
import VisaoGeral from './views/VisaoGeral.jsx'
import AbrirChamado from './views/AbrirChamado.jsx'
import FecharChamado from './views/FecharChamado.jsx'
import { apiService } from './services/apiService'

function App() {
  const [activeTab, setActiveTab] = useState('visao-geral')
  const [dashboardData, setDashboardData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshDashboard = async () => {
    try {
      setIsLoading(true)
      const data = await apiService.getDashboard()
      setDashboardData(data)
    } catch (error) {
      console.error("Erro ao buscar painel:", error)
      setDashboardData([]) 
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshDashboard()
  }, [])

  return (
    <div className="flex h-screen w-full bg-white">
      <Toaster position="top-right" richColors />

      {activeTab === 'visao-geral' && (
        <VisaoGeral 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          dashboardData={dashboardData} 
          isLoading={isLoading}  
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

export default App