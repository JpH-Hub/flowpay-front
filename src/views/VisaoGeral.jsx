import { useState } from "react"
import Sidebar from "../components/layout/Sidebar.jsx"
import Header from "../components/layout/Header.jsx"
import MonitoringBoard from "../components/dashboard/MonitoringBoard.jsx"
import TicketDetails from '../components/layout/TicketDetails.jsx'
import {
  monitoringColumns,
  findTicketById,
  findAgentByTicketId,
  selectedTicket,
} from '../data/mockData.js'
export default function VisaoGeral({ activeTab = 'visao-geral', setActiveTab }) {
  const [selectedTicketId, setSelectedTicketId] = useState('ticket-9821')
  const selectedAgentId = findAgentByTicketId(selectedTicketId)
  const ticket =
    selectedTicketId === 'ticket-9821'
      ? selectedTicket
      : findTicketById(selectedTicketId)

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex min-w-0 flex-1 flex-col gap-5 self-stretch p-6">
        <Header />
        <MonitoringBoard
          columns={monitoringColumns}
          selectedAgentId={selectedAgentId}
          selectedTicketId={selectedTicketId}
          onTicketSelect={setSelectedTicketId}
        />
      </main>

      <TicketDetails ticket={ticket} />
    </div>
  )
}
