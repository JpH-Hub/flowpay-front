import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '../Sidebar'

describe('Componente: <Sidebar />', () => {

  it('deve renderizar a marca FlowPay e as opções de navegação', () => {
    render(<Sidebar activeTab="visao-geral" setActiveTab={vi.fn()} />)

    expect(screen.getByText('FlowPay')).toBeInTheDocument()
    expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    expect(screen.getByText('Abrir Chamado')).toBeInTheDocument()
    expect(screen.getByText('Fechar Chamado')).toBeInTheDocument()
  })

  it('deve chamar a função setActiveTab com o ID correto ao clicar em um botão', () => {
    
    const setActiveTabMock = vi.fn()

    render(<Sidebar activeTab="visao-geral" setActiveTab={setActiveTabMock} />)

    const botaoAbrir = screen.getByText('Abrir Chamado')
    fireEvent.click(botaoAbrir)

    expect(setActiveTabMock).toHaveBeenCalledTimes(1)
    expect(setActiveTabMock).toHaveBeenCalledWith('abrir-chamado')
  })

})