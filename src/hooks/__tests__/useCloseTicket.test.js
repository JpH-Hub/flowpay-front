import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCloseTicket } from '../useCloseTicket'
import { apiService } from '../../services/apiService'
import { toast } from 'sonner'

vi.mock('../../services/apiService', () => ({
  apiService: {
    getDashboard: vi.fn(),
    closeTicket: vi.fn()
  }
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('Hook: useCloseTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar e achatar (flatten) os tickets do dashboard', async () => {
    const mockDashboard = [
      {
        title: 'Cartões',
        queue: { tickets: [{ id: 'ticket-1', chatRef: 'CHAT-1' }] },
        agents: [
          {
            name: 'Agente 1',
            tickets: [{ id: 'ticket-2', chatRef: 'CHAT-2' }]
          }
        ]
      }
    ]
    apiService.getDashboard.mockResolvedValueOnce(mockDashboard)

    const { result } = renderHook(() => useCloseTicket())

    await act(async () => {
      await result.current.loadActiveTickets()
    })

    expect(result.current.tickets).toHaveLength(2)
    expect(result.current.tickets[0]).toEqual({
      id: 'ticket-1',
      chatRef: 'CHAT-1',
      teamName: 'Cartões',
      agentName: 'Aguardando na Fila'
    })
    expect(result.current.tickets[1]).toEqual({
      id: 'ticket-2',
      chatRef: 'CHAT-2',
      teamName: 'Cartões',
      agentName: 'Agente 1'
    })
  })

  it('deve encerrar o ticket e removê-lo da lista local', async () => {
    apiService.closeTicket.mockResolvedValueOnce({})
    const onSuccessMock = vi.fn()

    const { result } = renderHook(() => useCloseTicket(onSuccessMock))

    await act(async () => {
      result.current.loadActiveTickets()
    })

    await act(async () => {
      await result.current.closeTicket('ticket-10')
    })

    expect(apiService.closeTicket).toHaveBeenCalledWith('10')
    expect(toast.success).toHaveBeenCalledWith('Chamado encerrado com sucesso!')
    expect(onSuccessMock).toHaveBeenCalledTimes(1)
  })
})