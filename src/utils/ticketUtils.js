export const getNumericTicketId = (id) => {
  if (!id) return ''
  return String(id).replace('ticket-', '')
}

export const getDisplayTicketId = (id) => {
  if (!id) return ''
  return String(id).replace('ticket-', 'TK-')
}