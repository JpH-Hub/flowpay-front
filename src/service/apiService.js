const API_URL = import.meta.env.VITE_API_URL

export async function fetchTickets() {
  try {
    const response = await fetch(`${API_URL}/tickets`)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error)
    throw error
  }
}