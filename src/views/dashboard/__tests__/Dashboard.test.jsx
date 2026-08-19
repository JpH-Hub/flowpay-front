import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from '../Dashboard'

describe('View: <Dashboard />', () => {
  it('deve exibir a mensagem de carregamento quando isLoading for true', () => {
    render(<Dashboard isLoading={true} isError={false} dashboardData={[]} />)
    
    expect(screen.getByText('Carregando painel...')).toBeInTheDocument()
  })

  it('deve exibir a tela de erro e permitir clicar em reconectar', () => {
    const mockRetry = vi.fn()
    
    render(<Dashboard isLoading={false} isError={true} dashboardData={[]} onRetry={mockRetry} />)
    
    expect(screen.getByText('Servidor Indisponível')).toBeInTheDocument()
    
    const btnReconectar = screen.getByRole('button', { name: /Tentar Reconectar/i })
    fireEvent.click(btnReconectar)
    
    expect(mockRetry).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar as colunas corretamente quando houver dados', () => {
    const mockData = [
      {
        id: 'team-1',
        title: 'Equipe de Cartões',
        capacity: { current: 1, max: 5 },
        queue: { current: 0, max: 10, tickets: [] },
        agents: []
      }
    ]

    render(<Dashboard isLoading={false} isError={false} dashboardData={mockData} />)
    expect(screen.getByText('Equipe de Cartões')).toBeInTheDocument()
    
    expect(screen.queryByText('Carregando painel...')).not.toBeInTheDocument()
    expect(screen.queryByText('Servidor Indisponível')).not.toBeInTheDocument()
  })
})