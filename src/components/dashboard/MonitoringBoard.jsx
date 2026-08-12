import TeamColumn from './TeamColumn.jsx'

export default function MonitoringBoard({
  columns,
  selectedAgentId,
  selectedTicketId,
  onTicketSelect,
}) {
  return (
    <div className="flex flex-1 gap-4">
      {columns.map((column) => (
        <TeamColumn
          key={column.id}
          title={column.title}
          capacity={column.capacity}
          agents={column.agents}
          queue={column.queue}
          selectedAgentId={selectedAgentId}
          selectedTicketId={selectedTicketId}
          onTicketSelect={onTicketSelect}
        />
      ))}
    </div>
  )
}
