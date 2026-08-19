import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import TeamColumn from '../TeamColumn'

describe('Componente: <TeamColumn />', () => {
  it('deve renderizar o título da coluna e organizar os agentes e a fila', () => {
    const mockCapacity = { current: 3, max: 10 }
    const mockQueue = { current: 1, max: 5, tickets: [] }
    const mockAgents = [
      { id: 'a1', name: 'Carlos', avatar: 'carlos.jpg', capacity: { current: 2, max: 5 }, tickets: [] }
    ]

    render(
      <TeamColumn 
        title="Equipe de Cartões" 
        capacity={mockCapacity} 
        agents={mockAgents} 
        queue={mockQueue} 
      />
    )

    expect(screen.getByText('Equipe de Cartões')).toBeInTheDocument()
    expect(screen.getByText('3/10')).toBeInTheDocument()
  
    expect(screen.getByText('Carlos')).toBeInTheDocument()

    expect(screen.getByText('FILA DE ESPERA')).toBeInTheDocument()
  })
})