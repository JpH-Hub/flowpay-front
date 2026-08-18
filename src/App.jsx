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
  const [isError, setIsError] = useState(false) 

  const refreshDashboard = async () => {
    try {
      setIsLoading(true)
      setIsError(false) // 2. Limpa o erro antes de tentar novamente
      const data = await apiService.getDashboard()
      setDashboardData(data)
    } catch (error) {
      console.error("Erro ao buscar painel:", error)
      setIsError(true) // 3. Marca que houve falha na comunicação com a API
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

export default App