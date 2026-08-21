import { TICKET_STATUS } from '../../constants/ticketStatus.js'

export default function StatusTag({ status }) {
  if (status === TICKET_STATUS.QUEUED) {
    return <span className="bg-yellow-100 text-yellow-800">Na Fila</span>
  }
  if (status === TICKET_STATUS.IN_SERVICE) {
    return <span className="bg-blue-100 text-blue-800">Em Atendimento</span>
  }
  if (status === 'CLOSED') {
    return <span className="inline-flex rounded bg-green-100 px-2 py-1 text-[11px] font-bold text-green-800">Encerrado</span>
  }
  if (status === 'REJECTED') {
    return <span className="inline-flex rounded bg-red-100 px-2 py-1 text-[11px] font-bold text-red-800">Rejeitado</span>
  }
  
  return <span className="inline-flex rounded bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-800">{status}</span>
}