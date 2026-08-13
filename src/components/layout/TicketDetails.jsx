import { AlertCircle, ArrowRightLeft, UserRound } from 'lucide-react'
import StatusTag from '../ui/StatusTag.jsx'

function DetailRow({ label, value, mono = false }) {
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

export default function TicketDetails({ ticket }) {
  if (!ticket) return null

  return (
    <aside className="flex w-[360px] shrink-0 flex-col justify-between self-stretch border-l border-[#e5e7eb] bg-white p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-[#111]">Informações do Ticket</h2>
          <span className="h-[3px] w-8 rounded-sm bg-[#facc15]" />
        </div>

        <div>
          <DetailRow label="Ticket ID" value={ticket.id} mono />
          <DetailRow label="Referência da Conversa" value={ticket.chatRef} mono />
          <DetailRow label="Assunto" value={ticket.subject} />

          <div className="border-b border-[#e5e7eb] py-2.5">
            <p className="text-xs font-medium uppercase text-[#4b5563]">Status</p>
            <div className="mt-1 pt-0.5">
              <StatusTag status={ticket.status} />
            </div>
          </div>

          <DetailRow label="Atendente Atribuído" value={ticket.agent} />
          <DetailRow label="Data/Hora de Entrada" value={ticket.entryDate} />
        </div>
      </div>

    </aside>
  )
}
