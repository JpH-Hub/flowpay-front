import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ErrorBoundary } from '../ErrorBoundary'

function ComponenteComErro() {
  throw new Error('Erro de renderização forçado')
}


function ComponenteSaudavel() {
  return <div>Painel carregado normalmente</div>
}

describe('Componente: <ErrorBoundary />', () => {
  let consoleSpy

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('deve renderizar os componentes filhos quando NÃO houver erros', () => {
    render(
      <ErrorBoundary>
        <ComponenteSaudavel />
      </ErrorBoundary>
    )

    expect(screen.getByText('Painel carregado normalmente')).toBeInTheDocument()
  })

  it('deve capturar a exceção e exibir a mensagem amigável de erro', () => {
    render(
      <ErrorBoundary>
        <ComponenteComErro />
      </ErrorBoundary>
    )

    expect(screen.getByText('Ops! Algo deu errado.')).toBeInTheDocument()
    expect(
      screen.getByText('Não foi possível carregar esta visão. Verifique se o serviço está disponível.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Recarregar Página/i })).toBeInTheDocument()
  })

  it('deve recarregar a página ao clicar no botão "Recarregar Página"', () => {
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: reloadMock }
    })

    render(
      <ErrorBoundary>
        <ComponenteComErro />
      </ErrorBoundary>
    )

    const botaoRecarregar = screen.getByRole('button', { name: /Recarregar Página/i })
    fireEvent.click(botaoRecarregar)
    
    expect(reloadMock).toHaveBeenCalledTimes(1)
  })

})