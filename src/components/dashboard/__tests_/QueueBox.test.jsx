import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import QueueBox from '../QueueBox'

describe('Componente: <QueueBox />', () => {
  it('deve exibir a mensagem de fila vazia quando não houver tickets', () => {
    render(<QueueBox current={0} max={10} tickets={[]} />)

    expect(screen.getByText('FILA DE ESPERA')).toBeInTheDocument()
    expect(screen.getByText('0/10')).toBeInTheDocument()
    expect(screen.getByText('Nenhum ticket aguardando')).toBeInTheDocument()
  })

  it('deve listar os tickets na fila e permitir o clique', () => {
    const mockTickets = [{ id: 'tk-2', chatRef: 'CHAT-999', status: 'QUEUED' }]
    const handleSelect = vi.fn()

    render(
      <QueueBox current={1} max={10} tickets={mockTickets} onTicketSelect={handleSelect} />
    )
    expect(screen.queryByText('Nenhum ticket aguardando')).not.toBeInTheDocument()
    
    const ticketBotao = screen.getByText('CHAT-999')
    fireEvent.click(ticketBotao)

    expect(handleSelect).toHaveBeenCalledWith('tk-2')
  })
})