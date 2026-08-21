import TeamColumn from './TeamColumn.jsx'

export default function MonitoringBoard({
  columns,
  selectedAgentId,
  selectedTicketId,
  onTicketSelect,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
