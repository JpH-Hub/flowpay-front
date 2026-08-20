import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import CloseTicket from '../CloseTicket'
import * as useCloseTicketHook from '../../../hooks/useCloseTicket'

vi.mock('../../../utils/ticketUtils.js', () => ({
  getDisplayTicketId: (id) => `TK-${id}`
}))

describe('View: <CloseTicket />', () => {
  it('deve exibir estado de carregamento', () => {
    vi.spyOn(useCloseTicketHook, 'useCloseTicket').mockReturnValue({
      tickets: [],
      isLoading: true,
      loadActiveTickets: vi.fn(),
      closeTicket: vi.fn()
    })

    render(<CloseTicket />)
    expect(screen.getByText('Carregando tickets...')).toBeInTheDocument()
  })

  it('deve exibir mensagem de lista vazia quando não houver tickets', () => {
    vi.spyOn(useCloseTicketHook, 'useCloseTicket').mockReturnValue({
      tickets: [],
      isLoading: false,
      loadActiveTickets: vi.fn(),
      closeTicket: vi.fn()
    })

    render(<CloseTicket />)
    expect(screen.getByText('Nenhum chamado ativo no momento.')).toBeInTheDocument()
  })

  it('deve listar os tickets e chamar closeTicket ao clicar no botão', () => {
    const mockCloseTicket = vi.fn()
    vi.spyOn(useCloseTicketHook, 'useCloseTicket').mockReturnValue({
      tickets: [{ id: '99', chatRef: 'CHAT-1', subject: 'Dúvida', agentName: 'Agente 1', status: 'IN_SERVICE' }],
      isLoading: false,
      loadActiveTickets: vi.fn(),
      closeTicket: mockCloseTicket
    })

    render(<CloseTicket />)
    
    expect(screen.getByText('#TK-99')).toBeInTheDocument()
    expect(screen.getByText('CHAT-1')).toBeInTheDocument()

    const botaoEncerrar = screen.getByRole('button', { name: /Encerrar/i })
    fireEvent.click(botaoEncerrar)

    expect(mockCloseTicket).toHaveBeenCalledWith('99')
  })
})