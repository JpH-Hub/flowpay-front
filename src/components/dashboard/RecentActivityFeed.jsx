import { Clock } from 'lucide-react'
import StatusTag from '../ui/StatusTag.jsx'
import { getDisplayTicketId } from '../../utils/ticketUtils.js'

export default function RecentActivityFeed({ recentTickets = [], onTicketSelect, selectedTicketId }) {
  if (recentTickets.length === 0) return null;

  const formatTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-[#e5e7eb] pt-6">
      <div className="flex items-center gap-2">
        <Clock className="size-4 text-[#6b7280]" />
        <h3 className="text-sm font-bold text-[#111]">Atividade Recente</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-3 pb-2 sm:grid-cols-2 xl:grid-cols-3">
        {recentTickets.map((ticket) => {
          const isSelected = selectedTicketId === ticket.id;
          const timeToDisplay = formatTime(ticket.closedAt || ticket.rejectedAt);

          return (
            <button
              key={ticket.id}
              onClick={() => onTicketSelect(ticket.id)}
              className={`flex min-w-0 flex-col gap-2 rounded-lg border p-3 text-left transition-colors ${
                isSelected ? 'border-[#111] bg-[#f9fafb]' : 'border-[#e5e7eb] bg-white hover:border-[#9ca3af]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#111]">
                  #{getDisplayTicketId(ticket.id)}
                </span>
                <StatusTag status={ticket.status} />
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="truncate text-xs font-semibold text-[#111]">{ticket.subject}</span>
                <span className="text-[11px] text-[#6b7280]">
                  {ticket.agentName ? `${ticket.agentName} • ` : ''}{ticket.teamName}
                </span>
              </div>

              <div className="mt-1 text-[10px] font-medium text-[#9ca3af]">
                {ticket.status === 'CLOSED' ? `Encerrado às ${timeToDisplay}` : `Rejeitado às ${timeToDisplay}`}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}