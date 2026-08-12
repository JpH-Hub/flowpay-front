import CapacityBadge from '../ui/CapacityBadge.jsx'
import AgentCard from './AgentCard.jsx'
import QueueBox from './QueueBox.jsx'

export default function TeamColumn({
  title,
  capacity,
  agents,
  queue,
  selectedAgentId,
  selectedTicketId,
  onTicketSelect,
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-[15px] font-bold text-[#111]">{title}</h3>
        <CapacityBadge current={capacity.current} max={capacity.max} />
      </div>

      <div className="flex flex-col gap-2">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            name={agent.name}
            avatar={agent.avatar}
            capacity={agent.capacity}
            tickets={agent.tickets}
            selected={selectedAgentId === agent.id}
            selectedTicketId={selectedTicketId}
            onTicketSelect={onTicketSelect}
          />
        ))}
      </div>

      <QueueBox
        current={queue.current}
        max={queue.max}
        tickets={queue.tickets}
        selectedTicketId={selectedTicketId}
        onTicketSelect={onTicketSelect}
      />
    </div>
  )
}
