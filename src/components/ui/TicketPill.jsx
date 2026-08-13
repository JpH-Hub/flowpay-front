import { MessageCircle } from 'lucide-react'
import StatusTag from './StatusTag'

export default function TicketPill({ chatRef, status, selected = false }) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-md border p-2.5 ${
        selected
          ? 'border-[#111] bg-[#fef08a]'
          : 'border-[#e5e7eb] bg-white'
      }`}
    >
      <MessageCircle className="size-3.5 shrink-0 text-[#111]" strokeWidth={2} />
      <span className="min-w-0 flex-1 truncate font-mono text-xs font-medium text-[#111]">
        {chatRef}
      </span>
      <StatusTag status={status} />
    </div>
  )
}
