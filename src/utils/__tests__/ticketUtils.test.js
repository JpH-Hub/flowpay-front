import { describe, it, expect } from 'vitest'
import { getNumericTicketId, getDisplayTicketId } from '../ticketUtils'


describe('Utilitários de Ticket (ticketUtils.js)', () => {

  it('deve extrair apenas o número quando receber um id com prefixo ticket-', () => {
    const idSujo = 'ticket-53'
    const idLimpo = getNumericTicketId(idSujo)
    
    expect(idLimpo).toBe('53')
  })

  it('deve retornar vazio se o id passado for nulo ou indefinido', () => {
    expect(getNumericTicketId(null)).toBe('')
    expect(getNumericTicketId(undefined)).toBe('')
  })

  it('deve formatar o ID numérico para o padrão visual TK-', () => {
    const idDaAPI = 'ticket-150'
    const idVisual = getDisplayTicketId(idDaAPI)
    
    expect(idVisual).toBe('TK-150')
  })
})