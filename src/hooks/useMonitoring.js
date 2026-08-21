import { useState, useCallback, useEffect } from 'react'
import { apiService } from '../services/apiService'

export function useMonitoring() {
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoadingRecent, setIsLoadingRecent] = useState(true)

  const loadRecentActivity = useCallback(async () => {
    try {
      setIsLoadingRecent(true)
      const data = await apiService.getRecentActivity()
      setRecentActivity(data)
    } catch (error) {
      console.error("Erro ao carregar atividade recente:", error)
    } finally {
      setIsLoadingRecent(false)
    }
  }, [])

  useEffect(() => {
    loadRecentActivity()
  }, [loadRecentActivity])

  return { recentActivity, isLoadingRecent, loadRecentActivity }
}