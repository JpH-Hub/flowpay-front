import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiService } from '../apiService'

const originalFetch = global.fetch

describe('Service: apiService', () => {
  
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    
    global.fetch = originalFetch
    vi.clearAllMocks()
  })

  it('deve realizar GET em getDashboard e retornar os dados em caso de sucesso', async () => {
    const mockData = [{ id: 1, title: 'Equipe de Cartões' }]

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const data = await apiService.getDashboard()
    
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/dashboard'), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    
    expect(data).toEqual(mockData)
  })

  it('deve realizar POST com o payload correto em createTicket', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 99 })
    })

    await apiService.createTicket('CHAT-123', 'Problema de acesso')

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tickets'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationRef: 'CHAT-123', subject: 'Problema de acesso' })
    })
  })

  it('deve realizar PATCH com a URL formatada corretamente em closeTicket', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({})
    })

    await apiService.closeTicket('15')

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tickets/15/close'), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    })
  })

  it('deve lançar erro com a mensagem do backend (handleResponse) quando a resposta falhar', async () => {
    
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Dados inválidos ou incompletos' })
    })

    
    await expect(apiService.getDashboard()).rejects.toThrow('Dados inválidos ou incompletos')
  })

  it('deve lançar erro genérico de rede se a resposta não for ok e o JSON falhar', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => { throw new Error('Não é um JSON') }
    })

    await expect(apiService.getDashboard()).rejects.toThrow('Erro de rede HTTP: 500')
  })
})