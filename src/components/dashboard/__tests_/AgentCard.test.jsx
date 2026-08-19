import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import AgentCard from '../AgentCard'

describe('Componente: <AgentCard />', () => {
  const mockCapacity = { current: 1, max: 3 }
  const mockTickets = [{ id: 'tk-1', chatRef: 'CHAT-123', status: 'IN_SERVICE' }]

  it('deve exibir o nome do agente, avatar e sua capacidade', () => {
    render(
      <AgentCard name="Ana Silva" avatar="ana.jpg" capacity={mockCapacity} />
    )

    expect(screen.getByText('Ana Silva')).toBeInTheDocument()
    expect(screen.getByText('1/3')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'ana.jpg')
  })
  
  it('deve chamar onTicketSelect com o ID correto ao clicar em um ticket', () => {
    const handleSelect = vi.fn()
    
    render(
      <AgentCard 
        name="Ana Silva" 
        avatar="ana.jpg" 
        capacity={mockCapacity} 
        tickets={mockTickets}
        onTicketSelect={handleSelect}
      />
    )

    const ticketBotao = screen.getByText('CHAT-123')
    fireEvent.click(ticketBotao)

    expect(handleSelect).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledWith('tk-1')
  })
})