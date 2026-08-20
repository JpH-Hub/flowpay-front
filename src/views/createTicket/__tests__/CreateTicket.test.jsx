import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import CreateTicket from '../CreateTicket'
import * as useCreateTicketHook from '../../../hooks/useCreateTicket'

describe('View: <CreateTicket />', () => {
  it('deve permitir preencher o formulário e enviar os dados', () => {
    const mockCreateTicket = vi.fn()
    vi.spyOn(useCreateTicketHook, 'useCreateTicket').mockReturnValue({
      createTicket: mockCreateTicket,
      isLoading: false,
      submitted: false
    })

    render(<CreateTicket />)
    
    const inputRef = screen.getByPlaceholderText('Ex: WHATS-16')
    const inputSubject = screen.getByPlaceholderText('Ex: Preciso de ajuda com meus cartões de crédito')
    
    fireEvent.change(inputRef, { target: { value: 'CHAT-999' } })
    fireEvent.change(inputSubject, { target: { value: 'Não consigo acessar o app' } })

    const botaoSubmit = screen.getByRole('button', { name: /Criar e Roteá-lo Automaticamente/i })
    fireEvent.click(botaoSubmit)

    expect(mockCreateTicket).toHaveBeenCalledWith('CHAT-999', 'Não consigo acessar o app')
  })

  it('deve exibir a tela de sucesso quando submitted for true', () => {
    vi.spyOn(useCreateTicketHook, 'useCreateTicket').mockReturnValue({
      createTicket: vi.fn(),
      isLoading: false,
      submitted: true
    })

    render(<CreateTicket />)

    expect(screen.getByText('Chamado registrado com sucesso!')).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Ex: WHATS-16')).not.toBeInTheDocument()
  })
})