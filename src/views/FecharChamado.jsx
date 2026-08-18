import { useEffect } from 'react'
import { XCircle, Loader } from 'lucide-react'
import StatusTag from '../components/ui/StatusTag.jsx'
import { useCloseTicket } from '../hooks/useCloseTicket'

export default function FecharChamado({ refreshDashboard }) {
  const { 
    tickets, 
    isLoading, 
    closingTicketId, 
    loadActiveTickets, 
    closeTicket 
  } = useCloseTicket(refreshDashboard)
  
  useEffect(() => {
    loadActiveTickets()
  }, [loadActiveTickets])

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between border-b border-[#e5e7eb] pb-4">
        <div>
          <h1 className="text-lg font-extrabold text-[#111]">Encerrar Atendimentos</h1>
          <p className="text-xs text-[#6b7280]">
            Selecione um chamado em andamento para realizar a baixa manual.
          </p>
        </div>
      </header>

      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111]">Atendimentos Em Andamento</h2>
          <span className="rounded bg-[#f9fafb] px-2.5 py-1 text-xs font-bold text-[#4b5563]">
            {tickets.length} Ativos
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-semibold text-[#6b7280]">
            <Loader className="size-5 animate-spin" strokeWidth={2} />
            Carregando tickets...
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-12 text-center text-sm font-semibold text-[#9ca3af]">
            Nenhum chamado ativo no momento.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3.5"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-[#111]">
                    #{String(t.id).replace('ticket-', 'TK-')}
                  </span>
                  <span className="font-mono text-xs text-[#4b5563]">{t.chatRef}</span>
                  <span className="text-xs font-semibold text-[#111]">{t.subject || t.teamName}</span>
                  <span className="text-xs text-[#6b7280]">({t.agentName})</span>
                  
                  {t.entryDate && (
                    <span className="text-xs text-[#9ca3af]">{t.entryDate}</span>
                  )}

                  <StatusTag status={t.status} />
                </div>

                <button
                  type="button"
                  onClick={() => handleClose(t.id)}
                  disabled={closingTicketId === t.id}
                  className="flex items-center gap-1.5 rounded-md border border-[#111] bg-white px-3 py-1.5 text-xs font-bold text-[#111] transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {closingTicketId === t.id ? (
                    <>
                      <Loader className="size-3.5 animate-spin" strokeWidth={2} />
                      Encerrando...
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3.5" strokeWidth={2} />
                      Encerrar
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}