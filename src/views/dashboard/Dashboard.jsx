import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar.jsx'
import Header from '../../components/layout/Header.jsx'
import TeamColumn from '../../components/dashboard/TeamColumn.jsx'
import TicketDetails from '../../components/layout/TicketDetails.jsx'
import { ErrorBoundary } from '../../components/layout/ErrorBoundary.jsx'
import { useMonitoring } from '../../hooks/useMonitoring.js'
import RecentActivityFeed from '../../components/dashboard/RecentActivityFeed.jsx'

export default function Dashboard({ 
  activeTab, 
  setActiveTab, 
  dashboardData = [], 
  isLoading,
  isError,
  onRetry 
}) {
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  
  const { recentActivity } = useMonitoring()

  const getSelectedTicketInfo = () => {
    if (!selectedTicketId) return null

    // 2. Procura primeiro nos tickets ativos (Fila e Atendentes)
    if (dashboardData && dashboardData.length > 0) {
      for (const team of dashboardData) {
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
    }

    // 3. Se não achou ativo, procura na lista de Atividades Recentes
    if (recentActivity && recentActivity.length > 0) {
      const recentTicket = recentActivity.find((t) => t.id === selectedTicketId)
      if (recentTicket) {
        return {
          ticket: {
            ...recentTicket,
            agent: recentTicket.agentName || 'Sistema', // Pega o nome de quem fechou
            subject: recentTicket.subject || 'Sem assunto',
          },
          agentId: null
        }
      }
    }

    return null
  }

  const selectionInfo = getSelectedTicketInfo()
  const selectedTicket = selectionInfo?.ticket
  const selectedAgentId = selectionInfo?.agentId

  const isServerOffline = !isLoading && isError

  return (
    <div className="flex min-h-screen w-full flex-col md:h-screen md:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-gray-50">
        <Header title="Visão Geral" />
        
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="min-w-0 p-4 md:p-6">
            
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 font-medium">Carregando painel...</p>
              </div>

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

            ) : (
              <ErrorBoundary>
               
                <div className="flex flex-col gap-6">
                  
                 
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                  <RecentActivityFeed 
                    recentTickets={recentActivity}
                    selectedTicketId={selectedTicketId}
                    onTicketSelect={setSelectedTicketId}
                  />

                </div>
              </ErrorBoundary>
            )}

          </div>

          {selectedTicket && (
            <TicketDetails
              ticket={selectedTicket}
              onClose={() => setSelectedTicketId(null)}
            />
          )}

        </div>
      </main>
    </div>
  )
}