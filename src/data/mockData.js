export const selectedTicket = {
  id: '#TK-9821',
  chatRef: 'chat_982b189a',
  subject: 'Cartões',
  status: 'IN_SERVICE',
  agent: 'Atendente 1',
  entryDate: '12/08/2026 - 14:30',
}

export const monitoringColumns = [
  {
    id: 'cartoes',
    title: 'Cartões',
    capacity: { current: 2, max: 9 },
    queue: {
      current: 0,
      max: 3,
      tickets: []
    },
    agents: [
      {
        id: 'agent-1',
        name: 'Atendente 1',
        avatar: '/assets/avatars/agent-1.png',
        capacity: { current: 1, max: 3 },
        tickets: [
          {
            id: 'ticket-9821',
            chatRef: 'chat_982b189a',
            status: 'IN_SERVICE',
          },
        ],
      },
      {
        id: 'agent-2',
        name: 'Atendente 2',
        avatar: '/assets/avatars/agent-2.png',
        capacity: { current: 1, max: 3 },
        tickets: [
          {
            id: 'ticket-012c',
            chatRef: 'chat_012c85ff',
            status: 'IN_SERVICE',
          },
        ],
      },
      {
        id: 'agent-3',
        name: 'Atendente 3',
        avatar: '/assets/avatars/agent-3.png',
        capacity: { current: 0, max: 3 },
        tickets: [],
      },
    ],
  },
  {
    id: 'emprestimos',
    title: 'Empréstimos',
    capacity: { current: 3, max: 9 },
    queue: {
      current: 1,
      max: 3,
      tickets: [
        {
          id: 'ticket-q1',
          chatRef: 'chat_9981a2b',
          status: 'QUEUED',
        },
      ],
    },
    agents: [
      {
        id: 'agent-4',
        name: 'Atendente 4',
        avatar: '/assets/avatars/agent-4.png',
        capacity: { current: 3, max: 3 },
        tickets: [
          {
            id: 'ticket-445e',
            chatRef: 'chat_445e912c',
            status: 'IN_SERVICE',
          },
          {
            id: 'ticket-221f',
            chatRef: 'chat_221f70aa',
            status: 'IN_SERVICE',
          },
          {
            id: 'ticket-665e',
            chatRef: 'chat_3532c',
            status: 'IN_SERVICE',
          },
        ],
      },
      {
        id: 'agent-5',
        name: 'Atendente 5',
        avatar: '/assets/avatars/agent-5.png',
        capacity: { current: 3, max: 3 },
        tickets: [
          {
            id: 'ticket-883a',
            chatRef: 'chat_883a31bb',
            status: 'IN_SERVICE',
          },
          {
            id: 'ticket-914b',
            chatRef: 'chat_914b52cc',
            status: 'IN_SERVICE',
          },
          {
            id: 'ticket-327c',
            chatRef: 'chat_327c74dd',
            status: 'IN_SERVICE',
          },
        ],
      },
      {
        id: 'agent-6',
        name: 'Atendente 6',
        avatar: '/assets/avatars/agent-6.png',
        capacity: { current: 3, max: 3 },
        tickets: [
          {
            id: 'ticket-541d',
            chatRef: 'chat_541d86ee',
            status: 'IN_SERVICE',
          },
          {
            id: 'ticket-762e',
            chatRef: 'chat_762e19ff',
            status: 'IN_SERVICE',
          },
          {
            id: 'ticket-198f',
            chatRef: 'chat_198f43aa',
            status: 'IN_SERVICE',
          },
        ],
      },
    ],
  },
  {
    id: 'outros',
    title: 'Outros Assuntos',
    capacity: { current: 1, max: 9 },
    queue: {
      current: 0,
      max: 3,
      tickets: []
    },
    agents: [
      {
        id: 'agent-7',
        name: 'Atendente 7',
        avatar: '/assets/avatars/agent-7.png',
        capacity: { current: 1, max: 3 },
        tickets: [
          {
            id: 'ticket-771d',
            chatRef: 'chat_771d9082',
            status: 'IN_SERVICE',
          },
        ],
      },
      {
        id: 'agent-8',
        name: 'Atendente 8',
        avatar: '/assets/avatars/agent-8.png',
        capacity: { current: 0, max: 3 },
        tickets: [],
      },
      {
        id: 'agent-9',
        name: 'Atendente 9',
        avatar: '/assets/avatars/agent-9.png',
        capacity: { current: 0, max: 3 },
        tickets: [],
      },
    ],
  },
]

export function findTicketById(ticketId) {
  for (const column of monitoringColumns) {
    for (const agent of column.agents) {
      const ticket = agent.tickets.find((t) => t.id === ticketId)
      if (ticket) {
        return {
          id: `#TK-${ticket.id.replace('ticket-', '').toUpperCase()}`,
          chatRef: ticket.chatRef,
          subject: column.title,
          status: ticket.status,
          agent: agent.name,
          entryDate: '12/08/2026 - 14:30',
        }
      }
    }


    if (column.queue?.tickets) {
      const queueTicket = column.queue.tickets.find((t) => t.id === ticketId)
      if (queueTicket) {
        return {
          id: `#TK-${queueTicket.id.replace('ticket-', '').toUpperCase()}`,
          chatRef: queueTicket.chatRef,
          subject: column.title,
          status: queueTicket.status,
          agent: 'Aguardando Distribuição',
          entryDate: '12/08/2026 - 14:35',
        }
      }
    }
  }

  return null
}
export function findAgentByTicketId(ticketId) {
  for (const column of monitoringColumns) {
    for (const agent of column.agents) {
      if (agent.tickets.some((t) => t.id === ticketId)) {
        return agent.id
      }
    }
  }
  return 'agent-1'
}
