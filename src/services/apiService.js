const API_URL = import.meta.env.VITE_API_URL

async function handleResponse(response) {
  if (!response.ok) {

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erro de rede HTTP: ${response.status}`);
  }
  return response.json();
}

export const apiService = {
  
  createTicket: async (conversationRef, subject) => {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversationRef, subject }),
    });
    
    return handleResponse(response);
  },

  closeTicket: async (ticketId) => {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/close`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  getDashboard: async () => {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },
  
};