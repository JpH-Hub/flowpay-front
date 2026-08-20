import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import TicketDetails from '../TicketDetails'

describe('Componente: <TicketDetails />', () => {

  it('deve retornar vazio (não renderizar nada) se a prop ticket for nula', () => {
    const { container } = render(<TicketDetails ticket={null} />)

    expect(container.firstChild).toBeNull()
  })

  it('deve exibir as informações do ticket corretamente quando fornecido', () => {
    const mockTicket = {
      id: 'TK-123',
      chatRef: 'CHAT-999',
      subject: 'Problema no PIX',
      status: 'IN_SERVICE',
      agent: 'Carlos Silva',
      entryDate: '19/08/2026 14:30'
    }

    render(<TicketDetails ticket={mockTicket} />)

    expect(screen.getByText('Informações do Ticket')).toBeInTheDocument()

    expect(screen.getByText('TK-123')).toBeInTheDocument()
    expect(screen.getByText('CHAT-999')).toBeInTheDocument()
    expect(screen.getByText('Problema no PIX')).toBeInTheDocument()
    expect(screen.getByText('Carlos Silva')).toBeInTheDocument()
    expect(screen.getByText('19/08/2026 14:30')).toBeInTheDocument()
  })

})