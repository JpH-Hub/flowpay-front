import { X } from 'lucide-react'
import StatusTag from '../ui/StatusTag.jsx'

function DetailRow({ label, value, mono = false }) {
  if (!value) return null; 
  
  return (
    <div className="border-b border-[#e5e7eb] py-2.5">
      <p className="text-xs font-medium uppercase text-[#4b5563]">{label}</p>
      <p
        className={`mt-1 text-sm text-[#111] ${
          mono ? 'font-mono font-medium' : 'font-semibold'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

const formatDateTime = (dateValue) => {
  if (!dateValue) return null;
  
  let date;

  if (Array.isArray(dateValue)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateValue;

    date = new Date(year, month - 1, day, hour, minute, second);
  } else {
    date = new Date(dateValue);
  }

  if (isNaN(date.getTime())) return String(dateValue);

  return date.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', 
    hour: '2-digit', minute: '2-digit'
  }).replace(' ', ' às ');
}

export default function TicketDetails({ ticket, onClose }) {
  if (!ticket) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Fechar informações do ticket"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/25"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-details-title"
        className="relative flex h-full w-full max-w-[380px] flex-col overflow-y-auto bg-white p-4 shadow-2xl md:p-5"
      >
        <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h2 id="ticket-details-title" className="text-base font-bold text-[#111]">
              Informações do Ticket
            </h2>
            <button
              type="button"
              aria-label="Fechar informações do ticket"
              onClick={onClose}
              className="rounded-md p-1 text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111]"
            >
              <X className="size-5" />
            </button>
          </div>
          <span className="h-[3px] w-8 rounded-sm bg-[#facc15]" />
        </div>

        <div>
          <DetailRow label="Ticket ID" value={ticket.id} mono />
          <DetailRow label="Referência" value={ticket.chatRef} mono />
          <DetailRow label="Assunto" value={ticket.subject} />

          <div className="border-b border-[#e5e7eb] py-2.5">
            <p className="text-xs font-medium uppercase text-[#4b5563]">Status</p>
            <div className="mt-1 pt-0.5">
              <StatusTag status={ticket.status} />
            </div>
          </div>

          <DetailRow label="Atendente Atribuído" value={ticket.agent} />
          
          <div className="mt-6">
            <h3 className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2">Histórico de Eventos</h3>
            <div className="rounded-lg bg-[#f9fafb] border border-[#e5e7eb] p-3 space-y-2">
          
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#4b5563]">Criado em:</span>
                <span className="font-mono font-semibold text-[#111]">{formatDateTime(ticket.createdAt || ticket.entryDate)}</span>
              </div>
              
              {ticket.startedAt && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4b5563]">Início do Atendimento:</span>
                  <span className="font-mono font-semibold text-[#111]">{formatDateTime(ticket.startedAt)}</span>
                </div>
              )}
              

              {ticket.closedAt && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4b5563]">Encerrado em:</span>
                  <span className="font-mono font-semibold text-green-600">{formatDateTime(ticket.closedAt)}</span>
                </div>
              )}


              {ticket.rejectedAt && (
                <div className="mt-2 border-t border-red-200 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-red-600">Rejeitado em:</span>
                    <span className="font-mono font-bold text-red-600">{formatDateTime(ticket.rejectedAt)}</span>
                  </div>
                  <p className="text-[11px] text-red-500 mt-1">
                    Motivo: {ticket.rejectionReason === 'QUEUE_FULL' ? 'Fila Lotada' : ticket.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
        </div>
    </aside>
    </div>
  )
}