import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCreateTicket } from '../useCreateTicket'
import { apiService } from '../../services/apiService'
import { toast } from 'sonner'

vi.mock('../../services/apiService', () => ({
  apiService: {
    createTicket: vi.fn()
  }
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('Hook: useCreateTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve criar um ticket com sucesso e disparar o toast', async () => {
    apiService.createTicket.mockResolvedValueOnce({})
    const onSuccessMock = vi.fn()

    const { result } = renderHook(() => useCreateTicket(onSuccessMock))

    await act(async () => {
      await result.current.createTicket('CHAT-123', 'Dúvida PIX')
    })

    expect(apiService.createTicket).toHaveBeenCalledWith('CHAT-123', 'Dúvida PIX')
    expect(toast.success).toHaveBeenCalledWith('Chamado criado com sucesso!')
    expect(onSuccessMock).toHaveBeenCalledTimes(1)
    expect(result.current.submitted).toBe(true)
  })

  it('deve exibir toast de erro quando a API falhar', async () => {
    apiService.createTicket.mockRejectedValueOnce(new Error('Dados inválidos'))

    const { result } = renderHook(() => useCreateTicket())

    await act(async () => {
      await result.current.createTicket('CHAT-123', '')
    })

    expect(toast.error).toHaveBeenCalledWith('Dados inválidos')
    expect(result.current.isLoading).toBe(false)
  })
})