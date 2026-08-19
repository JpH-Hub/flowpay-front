import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import Header from '../Header'

describe('Componente: <Header />', () => {

  it('deve renderizar o título principal "Monitoramento de Atendimento"', () => {
    render(<Header />)
    
    const titulo = screen.getByText('Monitoramento de Atendimento')
    
    expect(titulo).toBeInTheDocument()
  })

})