import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../services/apiService'

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Usamos useCallback para o React não recriar essa função à toa
  const refreshDashboard = useCallback(async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const data = await apiService.getDashboard()
      setDashboardData(data)
    } catch (error) {
      console.error("Erro ao buscar painel:", error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Carrega ao iniciar
  useEffect(() => {
    refreshDashboard()
  }, [refreshDashboard])

  return { dashboardData, isLoading, isError, refreshDashboard }
}