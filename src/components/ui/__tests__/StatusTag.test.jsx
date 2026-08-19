import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import StatusTag from '../StatusTag'
import { TICKET_STATUS } from '../../../constants/ticketStatus'

describe('Componente: <StatusTag />', () => {
  it('deve renderizar a tag "Na Fila" para o status QUEUED', () => {
    render(<StatusTag status={TICKET_STATUS.QUEUED} />)

    expect(screen.getByText('Na Fila')).toBeInTheDocument()
  })

  it('deve renderizar a tag "Em Atendimento" para o status IN_SERVICE', () => {
    render(<StatusTag status={TICKET_STATUS.IN_SERVICE} />)

    expect(screen.getByText('Em Atendimento')).toBeInTheDocument()
  })

  it('não deve renderizar nada se o status for inválido ou ausente', () => {
    const { container } = render(<StatusTag status="UNKNOWN" />)

    expect(container.firstChild).toBeNull()
  })
})