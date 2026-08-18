import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { apiService } from '../services/apiService'
import { getNumericTicketId } from '../utils/ticketUtils.js'

export function useCloseTicket(onSuccess) {
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [closingTicketId, setClosingTicketId] = useState(null)

  const loadActiveTickets = useCallback(async () => {
    try {
      setIsLoading(true)
      const dashboardData = await apiService.getDashboard()
      
      const flatTickets = []
      dashboardData.forEach((team) => {
        team.queue?.tickets?.forEach((t) => {
          flatTickets.push({ ...t, teamName: team.title, agentName: 'Aguardando na Fila' })
        })
        team.agents?.forEach((agent) => {
          agent.tickets?.forEach((t) => {
            flatTickets.push({ ...t, teamName: team.title, agentName: agent.name })
          })
        })
      })
      setTickets(flatTickets)
    } catch (error) {
      toast.error('Erro ao carregar tickets ativos')
      setTickets([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const closeTicket = async (id) => {
  setClosingTicketId(id)
  try {
    const numericId = getNumericTicketId(id)
    await apiService.closeTicket(numericId)
      
      setTickets((prev) => prev.filter((t) => t.id !== id))
      toast.success('Chamado encerrado com sucesso!')
      
      if (onSuccess) onSuccess()
    } catch (error) {
      toast.error(error.message || 'Erro ao encerrar chamado')
    } finally {
      setClosingTicketId(null)
    }
  }

  return { tickets, isLoading, closingTicketId, loadActiveTickets, closeTicket }
}