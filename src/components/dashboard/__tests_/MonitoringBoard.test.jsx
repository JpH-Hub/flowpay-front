import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import MonitoringBoard from '../MonitoringBoard'

describe('Componente: <MonitoringBoard />', () => {
  it('deve renderizar múltiplas colunas baseadas nos dados fornecidos', () => {
    const mockColumns = [
      {
        id: 'col-1',
        title: 'Cartões',
        capacity: { current: 1, max: 5 },
        agents: [],
        queue: { current: 0, max: 10, tickets: [] }
      },
      {
        id: 'col-2',
        title: 'Empréstimos',
        capacity: { current: 2, max: 5 },
        agents: [],
        queue: { current: 1, max: 10, tickets: [] }
      }
    ]

    render(<MonitoringBoard columns={mockColumns} />)
    
    expect(screen.getByText('Cartões')).toBeInTheDocument()
    expect(screen.getByText('Empréstimos')).toBeInTheDocument()
  })
})