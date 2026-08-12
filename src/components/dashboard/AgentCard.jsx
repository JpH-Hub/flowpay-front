import CapacityBadge from '../ui/CapacityBadge.jsx'
import TicketPill from '../ui/TicketPill.jsx'
export default function AgentCard({
  name,
  avatar,
  capacity,
  tickets = [],
  selected = false,
  selectedTicketId,
  onTicketSelect,
}) {
  const hasTickets = tickets.length > 0

  return (
    <div
      className={`flex flex-col gap-2.5 rounded-lg bg-white p-3 shadow-[0_1px_1px_rgba(0,0,0,0.06)] ${
        selected ? 'border-2 border-[#facc15]' : 'border border-[#e5e7eb]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt={name}
            className="size-6 rounded-xl border border-[#e5e7eb] object-cover"
          />
          <span className="text-[13px] font-semibold text-[#111]">{name}</span>
        </div>
        <CapacityBadge current={capacity.current} max={capacity.max} />
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
        <div className="h-[100px]" />
      )}
    </div>
  )
}
