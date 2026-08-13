import { useState } from 'react'
import { Toaster } from 'sonner'
import Sidebar from './components/layout/Sidebar.jsx'
import VisaoGeral from './views/VisaoGeral.jsx'
import AbrirChamado from './views/AbrirChamado.jsx'
import FecharChamado from './views/FecharChamado.jsx'
import { fetchTickets } from './service/apiService.js'

function App() {
  const [activeTab, setActiveTab] = useState('visao-geral')
  return (
    <div className="flex h-screen w-full bg-white">
      <Toaster position="top-right" richColors />

      {activeTab === 'visao-geral' && (
        <VisaoGeral activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {activeTab === 'abrir-chamado' && (
        <div className="flex h-screen w-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <AbrirChamado />
        </div>
      )}

      {activeTab === 'fechar-chamado' && (
        <div className="flex h-screen w-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <FecharChamado />
        </div>
      )}
    </div>
  )
}

export default App