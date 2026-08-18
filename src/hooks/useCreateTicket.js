import { useState } from 'react'
import { toast } from 'sonner'
import { apiService } from '../services/apiService'

export function useCreateTicket(onSuccess) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const createTicket = async (conversationRef, subject) => {
    setIsLoading(true)
    try {
      await apiService.createTicket(conversationRef, subject)
      
      setSubmitted(true)
      toast.success('Chamado criado com sucesso!')
      
      if (onSuccess) onSuccess() // Atualiza o App.jsx
      
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      toast.error(error.message || 'Erro ao criar chamado')
    } finally {
      setIsLoading(false)
    }
  }

  return { createTicket, isLoading, submitted }
}