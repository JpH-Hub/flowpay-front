import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useDashboard } from '../useDashboard'
import { apiService } from '../../services/apiService'

vi.mock('../../services/apiService', () => ({
  apiService: {
    getDashboard: vi.fn()
  }
}))

describe('Hook: useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar os dados do dashboard com sucesso', async () => {
    const mockData = [{ id: 'team-1', title: 'Cartões' }]
    apiService.getDashboard.mockResolvedValueOnce(mockData)

    const { result } = renderHook(() => useDashboard())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.dashboardData).toEqual(mockData)
    expect(result.current.isError).toBe(false)
  })

  it('deve definir isError como true quando a API falhar', async () => {
    apiService.getDashboard.mockRejectedValueOnce(new Error('Erro no servidor'))

    const { result } = renderHook(() => useDashboard())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isError).toBe(true)
    expect(result.current.dashboardData).toEqual([])
  })

  it('deve recarregar os dados ao chamar refreshDashboard', async () => {
    apiService.getDashboard.mockResolvedValue([])

    const { result } = renderHook(() => useDashboard())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      await result.current.refreshDashboard()
    })

    expect(apiService.getDashboard).toHaveBeenCalledTimes(2)
  })
})