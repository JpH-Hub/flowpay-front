import CapacityBadge from '../ui/CapacityBadge.jsx'
import TicketPill from '../ui/TicketPill.jsx'

export default function QueueBox({
  current,
  max,
  tickets = [],
  selectedTicketId,
  onTicketSelect,
}) {
  const hasTickets = tickets.length > 0

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed border-[#e5e7eb] bg-[#f9fafb] p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`size-1.5 rounded-sm ${
              hasTickets ? 'bg-[#facc15]' : 'bg-[#9ca3af]'
            }`}
          />
          <span className="font-mono text-xs font-bold text-[#4b5563]">
            FILA DE ESPERA
          </span>
        </div>
        <CapacityBadge current={current} max={max} variant="idle" />
      </div>

      {hasTickets ? (
        <div className="flex flex-col gap-1.5">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => onTicketSelect?.(ticket.id)}
              className="w-full text-left"
            >
              <TicketPill
                chatRef={ticket.chatRef}
                status={ticket.status}
                selected={selectedTicketId === ticket.id}
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-[#9ca3af]">Nenhum ticket aguardando</p>
      )}
    </div>
  )
}