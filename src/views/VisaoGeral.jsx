import { useState } from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import TeamColumn from '../components/dashboard/TeamColumn.jsx'
import TicketDetails from '../components/layout/TicketDetails.jsx'
import { ErrorBoundary } from '../components/layout/ErrorBoundary.jsx'

export default function VisaoGeral({ 
  activeTab, 
  setActiveTab, 
  dashboardData = [], 
  isLoading,
  onRetry 
}) {
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  const getSelectedTicketInfo = () => {
    if (!selectedTicketId || !dashboardData || dashboardData.length === 0) return null

    for (const team of dashboardData) {
      // 1. Procura na fila
      const queuedTicket = team.queue?.tickets?.find((t) => t.id === selectedTicketId)
      if (queuedTicket) {
        return {
          ticket: {
            ...queuedTicket,
            agent: 'Aguardando na Fila',
            subject: queuedTicket.subject || 'Sem assunto',
            entryDate: queuedTicket.entryDate || 'Data desconhecida'
          },
          agentId: null
        }
      }

      // 2. Procura nos atendentes
      for (const agent of team.agents || []) {
        const agentTicket = agent.tickets?.find((t) => t.id === selectedTicketId)
        if (agentTicket) {
          return {
            ticket: {
              ...agentTicket,
              agent: agent.name,
              subject: agentTicket.subject || 'Sem assunto',
              entryDate: agentTicket.entryDate || 'Data desconhecida'
            },
            agentId: agent.id 
          }
        }
      }
    }
    return null
  }

  const selectionInfo = getSelectedTicketInfo()
  const selectedTicket = selectionInfo?.ticket
  const selectedAgentId = selectionInfo?.agentId

  // Se não estiver carregando e os dados vierem vazios/nulos, assumimos que o servidor está fora ou sem dados
  const isServerOffline = !isLoading && (!dashboardData || dashboardData.length === 0)

  return (
    <div className="flex h-screen w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 bg-gray-50 flex flex-col min-w-0">
        <Header title="Visão Geral" />
        
        <div className="flex-1 overflow-x-auto flex">
          <div className="flex-1 p-6">
            
            {/* 1. Loading */}
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 font-medium">Carregando painel...</p>
              </div>

            /* 2. Servidor Offline / Indisponível */
            ) : isServerOffline ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                <div className="rounded-full bg-amber-100 p-3 text-amber-600 mb-1">🔌</div>
                <h3 className="text-base font-bold text-gray-800">Servidor Indisponível</h3>
                <p className="text-xs text-gray-500 max-w-sm">
                  Não foi possível obter dados da API. Verifique se o backend Spring Boot está rodando.
                </p>
                <button
                  onClick={onRetry}
                  className="mt-2 rounded bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
                >
                  Tentar Reconectar
                </button>
              </div>

            /* 3. Renderização Protegida pelo ErrorBoundary */
            ) : (
              <ErrorBoundary>
                <div className="flex gap-6 h-full min-w-max">
                  {dashboardData.map((column) => (
                    <TeamColumn
                      key={column.id}
                      title={column.title}
                      capacity={column.capacity}
                      queue={column.queue}
                      agents={column.agents}
                      selectedTicketId={selectedTicketId}
                      selectedAgentId={selectedAgentId}
                      onTicketSelect={setSelectedTicketId}
                    />
                  ))}
                </div>
              </ErrorBoundary>
            )}

          </div>

          {selectedTicket && (
            <TicketDetails ticket={selectedTicket} />
          )}

        </div>
      </main>
    </div>
  )
}