import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import TicketPill from '../TicketPill'
import { TICKET_STATUS } from '../../../constants/ticketStatus'

describe('Componente: <TicketPill />', () => {
  it('deve exibir a referência do chat e a tag de status correspondente', () => {
    render(<TicketPill chatRef="CHAT-8821" status={TICKET_STATUS.QUEUED} />)

    expect(screen.getByText('CHAT-8821')).toBeInTheDocument()
    expect(screen.getByText('Na Fila')).toBeInTheDocument()
  })

  it('deve alterar o estilo de fundo quando selected for true', () => {
    const { container, rerender } = render(
      <TicketPill chatRef="CHAT-101" status={TICKET_STATUS.IN_SERVICE} selected={false} />
    )
    expect(container.firstChild).toHaveClass('bg-white')

    rerender(<TicketPill chatRef="CHAT-101" status={TICKET_STATUS.IN_SERVICE} selected={true} />)
    expect(container.firstChild).toHaveClass('bg-[#fef08a]')
  })
})