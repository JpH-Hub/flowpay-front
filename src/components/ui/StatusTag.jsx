import { TICKET_STATUS } from '../../constants/ticketStatus.js'

export default function StatusTag({ status }) {
  if (status === TICKET_STATUS.QUEUED) {
    return <span className="bg-yellow-100 text-yellow-800">Na Fila</span>
  }
  if (status === TICKET_STATUS.IN_SERVICE) {
    return <span className="bg-blue-100 text-blue-800">Em Atendimento</span>
  }
}